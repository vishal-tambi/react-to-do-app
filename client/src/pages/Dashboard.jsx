import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Plus, Layout, LogOut, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TimerWidget from '../components/TimerWidget';
import MobileNav from '../components/MobileNav';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [boards, setBoards] = useState([]);
    const [newBoardTitle, setNewBoardTitle] = useState('');

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const { data } = await api.get('/boards');
                setBoards(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBoards();
    }, []);

    const createBoard = async (e) => {
        e.preventDefault();
        if (!newBoardTitle.trim()) return;
        try {
            const { data } = await api.post('/boards', { title: newBoardTitle });
            setBoards([...boards, data]);
            setNewBoardTitle('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-8">
                        <Layout className="w-8 h-8" />
                        <span className="text-xl font-bold">TaskFlow</span>
                    </div>

                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium">
                            <Layout className="w-5 h-5" />
                            Dashboard
                        </button>
                        <Link to="/calendar" className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                            <Calendar className="w-5 h-5" />
                            Calendar
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto pb-24">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your projects and tasks efficiently.</p>
                    </div>
                    <button
                        onClick={logout}
                        className="hidden md:flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                    <div className="md:hidden">
                        <button onClick={logout} className="text-red-600">Logout</button>
                    </div>

                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Boards Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Create Board Input */}
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Board</h2>
                            <form onSubmit={createBoard} className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter board name..."
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={newBoardTitle}
                                    onChange={(e) => setNewBoardTitle(e.target.value)}
                                />
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-lg shadow-blue-200">
                                    <Plus className="w-5 h-5" />
                                    Create
                                </button>
                            </form>
                        </div>

                        {/* Boards Grid */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Boards</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <AnimatePresence>
                                    {boards.map((board, index) => (
                                        <motion.div
                                            key={board._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={`/board/${board._id}`}
                                                className="block p-4 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        <Layout className="w-6 h-6" />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{board.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    Created {new Date(board.createdAt).toLocaleDateString()}
                                                </p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {boards.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                                        No boards yet. Create your first one above!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Focus Timer</h2>
                            <TimerWidget />
                        </div>

                        {/* Additional widgets could go here */}
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                            <h3 className="text-xl font-bold mb-2">Pro Tip</h3>
                            <p className="text-purple-100 text-sm">
                                Use the timer to break your work into focused intervals. The Pomodoro technique suggests 25 minutes of work followed by a 5-minute break.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <MobileNav />
        </div>
    );
};

export default Dashboard;
