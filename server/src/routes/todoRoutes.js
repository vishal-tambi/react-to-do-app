const express = require('express');
const router = express.Router();
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUser,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createTodo);
router.route('/user').get(protect, getTodosByUser);
router.route('/board/:boardId').get(protect, getTodos);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
