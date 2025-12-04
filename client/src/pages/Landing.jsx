import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, ArrowRight, Star, Menu, X } from 'lucide-react';

const Landing = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                TaskMaster
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Features</a>
                            <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Testimonials</a>
                            <Link to="/login" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Login</Link>
                            <Link to="/register" className="block px-3 py-2 text-blue-600 font-medium">Get Started</Link>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white -z-10"></div>
                <div className="absolute top-20 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8"
                        >
                            Organize your work, <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                amplify your productivity.
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            The all-in-one workspace for your tasks, notes, and projects.
                            Simple enough for personal use, powerful enough for teams.
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transform hover:-translate-y-1">
                                Start for free <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all hover:border-gray-300">
                                Live Demo
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image / Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-20 relative mx-auto max-w-5xl"
                    >
                        <div className="rounded-2xl bg-gray-900 p-2 shadow-2xl ring-1 ring-gray-900/10">
                            <div className="rounded-xl bg-gray-800 overflow-hidden aspect-[16/9] relative group">
                                {/* Placeholder for actual app screenshot */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                                            <Zap className="h-10 w-10 text-blue-400" />
                                        </div>
                                        <p className="text-gray-400 font-medium">App Dashboard Preview</p>
                                    </div>
                                </div>
                                {/* Decorative UI elements */}
                                <div className="absolute top-4 left-4 right-4 h-8 bg-gray-700/50 rounded-lg flex items-center px-3 space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to stay on track
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
                                title: "Smart Task Management",
                                description: "Organize tasks with tags, priorities, and deadlines. Never miss a beat with smart reminders."
                            },
                            {
                                icon: <Zap className="h-8 w-8 text-indigo-500" />,
                                title: "Real-time Collaboration",
                                description: "Work together with your team in real-time. See changes as they happen across all devices."
                            },
                            {
                                icon: <Shield className="h-8 w-8 text-purple-500" />,
                                title: "Bank-grade Security",
                                description: "Your data is encrypted and secure. We prioritize your privacy and data protection."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900">Trusted by thousands</h2>
                    </div>

                    <div className="relative">
                        <div className="flex flex-wrap justify-center gap-8">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm"
                                >
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, star) => (
                                            <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-6 italic">"This app completely transformed how I manage my daily tasks. The interface is beautiful and intuitive."</p>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-bold text-gray-900">User {i}</p>
                                            <p className="text-sm text-gray-500">Product Manager</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 z-0"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to boost your productivity?</h2>
                            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                                Join thousands of users who are getting more done with less stress. Start your free trial today.
                            </p>
                            <Link to="/register" className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-blue-50 transition-colors shadow-lg transform hover:scale-105 duration-200">
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <span className="text-xl font-bold text-gray-900">TaskMaster</span>
                            <p className="text-gray-500 text-sm mt-1">© 2025 TaskMaster. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-600">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-gray-600">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-gray-600">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
