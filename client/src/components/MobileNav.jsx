import { Layout, Calendar, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const MobileNav = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between z-50 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Link
                to="/dashboard"
                className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <Layout className="w-6 h-6" />
                <span className="text-xs font-medium">Dashboard</span>
            </Link>

            <Link
                to="/calendar"
                className={`flex flex-col items-center gap-1 ${isActive('/calendar') ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <Calendar className="w-6 h-6" />
                <span className="text-xs font-medium">Calendar</span>
            </Link>

            <button
                onClick={logout}
                className="flex flex-col items-center gap-1 text-red-500 hover:text-red-600"
            >
                <LogOut className="w-6 h-6" />
                <span className="text-xs font-medium">Logout</span>
            </button>
        </div>
    );
};

export default MobileNav;
