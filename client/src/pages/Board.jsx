import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Trash2, Plus, ArrowLeft, CheckCircle, Circle, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Board = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDate, setNewTodoDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoardAndTodos = async () => {
            try {
                const boardsRes = await api.get('/boards');
                const currentBoard = boardsRes.data.find(b => b._id === id);
                if (currentBoard) {
                    setBoard(currentBoard);
                } else {
                    navigate('/'); // Board not found
                }

                const todosRes = await api.get(`/todos/board/${id}`);
                setTodos(todosRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBoardAndTodos();
    }, [id, navigate]);
    console.log(motion);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;
        console.log('Sending todo:', { boardId: id, title: newTodoTitle, dueDate: newTodoDate });
        try {
            const { data } = await api.post('/todos', {
                boardId: id,
                title: newTodoTitle,
                status: 'pending',
                dueDate: newTodoDate || null
            });
            console.log('Received todo:', data);
            setTodos([...todos, data]);
            setNewTodoTitle('');
            setNewTodoDate('');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            await api.delete(`/todos/${todoId}`);
            setTodos(todos.filter(t => t._id !== todoId));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleStatus = async (todo) => {
        const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
        try {
            const { data } = await api.put(`/todos/${todo._id}`, { status: newStatus });
            setTodos(todos.map(t => t._id === todo._id ? data : t));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBoard = async () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            try {
                await api.delete(`/boards/${id}`);
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
    };

    const isOverdue = (date) => {
        if (!date) return false;
        return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
    };

    const formatDueDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;
    if (!board) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Board not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center mb-8 text-gray-500 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </button>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{board.title}</h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Created on {new Date(board.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={deleteBoard}
                        className="p-3 text-red-600 rounded-xl hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                        title="Delete Board"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={newTodoTitle}
                                onChange={(e) => setNewTodoTitle(e.target.value)}
                            />
                        </div>
                        <div className="sm:w-48">
                            <input
                                type="datetime-local"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-600"
                                value={newTodoDate}
                                onChange={(e) => setNewTodoDate(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-200">
                            <Plus className="w-5 h-5" />
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="space-y-3">
                    <AnimatePresence>
                        {todos.map((todo) => (
                            <motion.div
                                key={todo._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`group flex items-center justify-between p-5 bg-white rounded-xl border transition-all hover:shadow-md ${todo.status === 'completed' ? 'border-gray-100 bg-gray-50/50' : 'border-gray-100'
                                    }`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <button
                                        onClick={() => toggleStatus(todo)}
                                        className={`transition-colors ${todo.status === 'completed' ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'
                                            }`}
                                    >
                                        {todo.status === 'completed' ? (
                                            <CheckCircle className="w-6 h-6" />
                                        ) : (
                                            <Circle className="w-6 h-6" />
                                        )}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-lg font-medium transition-all ${todo.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                                                }`}>
                                                {todo.title}
                                            </p>
                                            {todo.dueDate && (
                                                <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isOverdue(todo.dueDate) && todo.status !== 'completed'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    <Calendar className="w-3 h-3" />
                                                    {formatDueDate(todo.dueDate)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteTodo(todo._id)}
                                    className="p-2 bg-red-500 text-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {todos.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                            <p className="text-gray-500 mt-1">No tasks on this board yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
