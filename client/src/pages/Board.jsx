import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Trash2, Plus, ArrowLeft, CheckCircle, Circle, Clock } from 'lucide-react';

const Board = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoardAndTodos = async () => {
            try {
                // Fetch board details (we might need a specific endpoint or just use the list if we store it in context, but fetching is safer)
                // Actually our API doesn't have getBoardById, only getBoards (all).
                // We should add getBoardById to backend or filter from getBoards.
                // Let's filter from getBoards for now or add endpoint.
                // Adding endpoint is better.
                // But for speed, let's try to fetch all and find.
                // Wait, updateBoard and deleteBoard use ID, so we can probably add getBoardById easily.
                // But let's stick to what we have.
                // I'll fetch all boards and find the one.
                const boardsRes = await api.get('/boards');
                const currentBoard = boardsRes.data.find(b => b._id === id);
                if (currentBoard) {
                    setBoard(currentBoard);
                } else {
                    navigate('/'); // Board not found
                }

                // Fetch todos
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

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodoTitle.trim()) return;
        try {
            const { data } = await api.post('/todos', {
                boardId: id,
                title: newTodoTitle,
                status: 'pending'
            });
            setTodos([...todos, data]);
            setNewTodoTitle('');
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

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!board) return <div className="p-8 text-center">Board not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl px-4 py-8 mx-auto">
                <button onClick={() => navigate('/dashboard')} className="flex items-center mb-6 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </button>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{board.title}</h1>
                    <button onClick={deleteBoard} className="p-2 text-red-600 rounded-full hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 mb-8 bg-white rounded-lg shadow">
                    <form onSubmit={addTodo} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Add a new task..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                        />
                        <button type="submit" className="flex items-center px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            <Plus className="w-5 h-5 mr-2" /> Add
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    {todos.map((todo) => (
                        <div key={todo._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow transition">
                            <div className="flex items-center gap-4">
                                <button onClick={() => toggleStatus(todo)} className={`text-gray-400 hover:text-blue-600 ${todo.status === 'completed' ? 'text-green-500' : ''}`}>
                                    {todo.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                </button>
                                <span className={`text-lg ${todo.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                    {todo.title}
                                </span>
                            </div>
                            <button onClick={() => deleteTodo(todo._id)} className="text-gray-400 hover:text-red-500">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    {todos.length === 0 && (
                        <div className="py-12 text-center text-gray-500">
                            No tasks yet. Add one above!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
