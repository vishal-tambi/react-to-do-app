const Todo = require('../models/Todo');
const Board = require('../models/Board');

// @desc    Get todos for a board
// @route   GET /api/boards/:boardId/todos
// @access  Private
const getTodos = async (req, res) => {
    const todos = await Todo.find({ board: req.params.boardId });
    res.status(200).json(todos);
};

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
    const { boardId, title, description, status, dueDate } = req.body;

    if (!boardId || !title) {
        return res.status(400).json({ message: 'Please add boardId and title' });
    }

    // Check if board exists and belongs to user
    const board = await Board.findById(boardId);
    if (!board) {
        return res.status(404).json({ message: 'Board not found' });
    }

    if (board.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const todo = await Todo.create({
        board: boardId,
        title,
        description,
        status,
        dueDate,
    });

    res.status(201).json(todo);
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Check board ownership
    const board = await Board.findById(todo.board);
    if (board.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTodo);
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Check board ownership
    const board = await Board.findById(todo.board);
    if (board.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await todo.deleteOne();

    res.status(200).json({ id: req.params.id });
};

// @desc    Get all todos for the logged-in user
// @route   GET /api/todos/user
// @access  Private
const getTodosByUser = async (req, res) => {
    // Find all boards belonging to the user
    const boards = await Board.find({ user: req.user.id });
    const boardIds = boards.map(board => board._id);

    // Find all todos associated with these boards
    const todos = await Todo.find({ board: { $in: boardIds } }).populate('board', 'title');

    res.status(200).json(todos);
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUser,
};
