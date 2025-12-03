const express = require('express');
const router = express.Router();
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

// Note: getTodos is usually accessed via /api/boards/:boardId/todos, but we can also have it here if we want.
// However, the controller expects boardId in params.
// Let's keep create, update, delete here.
// For getTodos, we might want to mount it on board routes or handle it here with a query param or route param.
// The plan said: GET /api/boards/:boardId/todos
// So we should handle that in boardRoutes or here.
// If we handle it in boardRoutes, we need to re-route to todoRouter.
// For simplicity, let's add a route here: /api/todos/board/:boardId
// Or just follow the plan: GET /api/boards/:boardId/todos
// I will add the route in boardRoutes to re-route to todoRouter, or just handle it in boardRoutes.
// But todoController has getTodos.
// Let's add /board/:boardId to this router for fetching todos.

router.get('/board/:boardId', protect, getTodos);
router.post('/', protect, createTodo);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
