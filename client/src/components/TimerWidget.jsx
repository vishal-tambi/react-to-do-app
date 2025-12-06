import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TimerWidget = () => {
    const [mode, setMode] = useState('stopwatch'); // 'stopwatch' or 'timer'
    const [time, setTime] = useState(0); // in seconds
    const [isActive, setIsActive] = useState(false);
    const [initialTime, setInitialTime] = useState(0); // for timer mode
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (mode === 'timer') {
                        if (prevTime <= 0) {
                            clearInterval(intervalRef.current);
                            setIsActive(false);
                            return 0;
                        }
                        return prevTime - 1;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, mode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(mode === 'timer' ? initialTime : 0);
    };

    const formatTime = (seconds) => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    const setTimerDuration = (minutes) => {
        const seconds = minutes * 60;
        setInitialTime(seconds);
        setTime(seconds);
        setIsActive(false);
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 w-full sm:max-w-md lg:max-w-sm mx-auto">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => {
                        setMode('stopwatch');
                        setIsActive(false);
                        setTime(0);
                    }}
                    className={`p-2 rounded-lg transition-colors ${mode === 'stopwatch' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Clock className="w-5 h-5" />
                </button>
                <button
                    onClick={() => {
                        setMode('timer');
                        setIsActive(false);
                        setTime(initialTime);
                    }}
                    className={`p-2 rounded-lg transition-colors ${mode === 'timer' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Timer className="w-5 h-5" />
                </button>
            </div>

            <div className="text-center mb-8">
                <div className="text-5xl font-mono font-bold text-gray-800 tracking-wider">
                    {formatTime(time)}
                </div>
            </div>

            {mode === 'timer' && !isActive && time === 0 && (
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {[5, 15, 25].map((min) => (
                        <button
                            key={min}
                            onClick={() => setTimerDuration(min)}
                            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors"
                        >
                            {min}m
                        </button>
                    ))}
                </div>
            )}

            <div className="flex justify-center gap-4">
                <button
                    onClick={toggleTimer}
                    className={`p-4 rounded-full text-white shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-md transition-transform active:scale-95"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default TimerWidget;
