import { useState, useEffect } from 'react';
import api from '../services/api';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await api.get('/todos/user');
                setTodos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getTodosForDate = (day) => {
        return todos.filter(todo => {
            if (!todo.dueDate) return false;
            const todoDate = new Date(todo.dueDate);
            return (
                todoDate.getDate() === day &&
                todoDate.getMonth() === currentDate.getMonth() &&
                todoDate.getFullYear() === currentDate.getFullYear()
            );
        });
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <CalendarIcon className="w-8 h-8 text-blue-600" />
                        Calendar
                    </h1>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="text-lg font-semibold text-gray-900 min-w-[150px] text-center">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 auto-rows-fr bg-gray-100 gap-px border-b border-gray-100">
                        {/* Empty cells for previous month */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/50" />
                        ))}

                        {/* Days */}
                        {Array.from({ length: days }).map((_, i) => {
                            const day = i + 1;
                            const dayTodos = getTodosForDate(day);
                            const isToday =
                                day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear();

                            return (
                                <div key={day} className={`min-h-[120px] bg-white p-3 transition-colors hover:bg-blue-50/30 ${isToday ? 'bg-blue-50/50' : ''}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'
                                            }`}>
                                            {day}
                                        </span>
                                        {dayTodos.length > 0 && (
                                            <span className="text-xs font-medium text-gray-400">
                                                {dayTodos.length} tasks
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        {dayTodos.map(todo => (
                                            <motion.div
                                                key={todo._id}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`text-xs p-1.5 rounded border truncate ${todo.status === 'completed'
                                                        ? 'bg-gray-50 text-gray-400 border-gray-100 line-through'
                                                        : 'bg-blue-50 text-blue-700 border-blue-100'
                                                    }`}
                                                title={todo.title}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 flex-shrink-0" />
                                                    <span className="truncate">{new Date(todo.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div className="truncate font-medium mt-0.5">{todo.title}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
