import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

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
        try {
            const { data } = await api.post('/boards', { title: newBoardTitle });
            setBoards([...boards, data]);
            setNewBoardTitle('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold">To-Do App</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4">Welcome, {user?.name}</span>
                            <button onClick={logout} className="text-red-600 hover:text-red-800">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900">Your Boards</h2>

                <form onSubmit={createBoard} className="mt-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="New Board Title"
                        className="px-4 py-2 border rounded-md"
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                    />
                    <button className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">Create Board</button>
                </form>

                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                    {boards.map((board) => (
                        <Link key={board._id} to={`/board/${board._id}`} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                            <h3 className="text-lg font-medium text-gray-900">{board.title}</h3>
                            <p className="mt-2 text-sm text-gray-500">Created at: {new Date(board.createdAt).toLocaleDateString()}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
