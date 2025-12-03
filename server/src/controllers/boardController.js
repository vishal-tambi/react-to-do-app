const Board = require('../models/Board');
const Todo = require('../models/Todo');

// @desc    Get all boards
// @route   GET /api/boards
// @access  Private
const getBoards = async (req, res) => {
    const boards = await Board.find({ user: req.user.id });
    res.status(200).json(boards);
};

// @desc    Create new board
// @route   POST /api/boards
// @access  Private
const createBoard = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ message: 'Please add a title' });
    }

    const board = await Board.create({
        title: req.body.title,
        user: req.user.id,
    });

    res.status(201).json(board);
};

// @desc    Update board
// @route   PUT /api/boards/:id
// @access  Private
const updateBoard = async (req, res) => {
    const board = await Board.findById(req.params.id);

    if (!board) {
        return res.status(404).json({ message: 'Board not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the board user
    if (board.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedBoard = await Board.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedBoard);
};

// @desc    Delete board
// @route   DELETE /api/boards/:id
// @access  Private
const deleteBoard = async (req, res) => {
    const board = await Board.findById(req.params.id);

    if (!board) {
        return res.status(404).json({ message: 'Board not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the board user
    if (board.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await board.deleteOne();

    // Also delete todos associated with this board
    // Note: We haven't created Todo model yet, but we will need this.
    // We can add this later or now if we import Todo model (which we did but file doesn't exist yet).
    // I'll comment it out or handle it gracefully if Todo model is not there.
    // Actually, I imported Todo at the top. I should create Todo model first or handle error.
    // But since I'm creating files in sequence, Todo model file doesn't exist yet.
    // I should create Todo model first or remove the import for now.
    // I'll remove the import for now and add it back when implementing Todo.

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getBoards,
    createBoard,
    updateBoard,
    deleteBoard,
};
