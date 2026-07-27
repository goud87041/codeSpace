"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth/auth.context";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleClick = (route) => {
        if (route === "login") {
            router.push("/user/login");
        } else if (route === "register") {
            router.push("/user/regiter");
        } else if (route === "logout") {
            logout();
            router.push("/user/login");
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">

                {/* Logo / Brand */}
                <div
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <span className="text-2xl">📖</span>
                    <span className="font-bold text-xl tracking-wider text-white">LibSys</span>
                </div>

                {/* Navigation Tabs (desktop) */}
                <nav className="hidden md:flex items-center gap-1">
                    <a
                        onClick={() => router.push("/books/addbook")}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
                    >
                        Add Book
                    </a>
                    <a
                        onClick={() => router.push("/books/all_books")}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
                    >
                        All Books
                    </a>
                    <a
                        onClick={() => router.push("/books/assignBooks")}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
                    >
                        All Assign Books
                    </a>

                    <a
                        onClick={() => router.push("/user/allUser")}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
                    >
                        All User
                    </a>
                </nav>

                {/* Mobile hamburger */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setOpen((s) => !s)}
                        aria-label="Toggle menu"
                        className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/60"
                    >
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu dropdown */}
                {open && (
                    <div className="absolute top-full left-0 right-0 bg-slate-800/95 border-t border-slate-700/60 md:hidden">
                        <div className="flex flex-col px-4 py-3 gap-1">
                            <button onClick={() => { setOpen(false); router.push('/books/addbook') }} className="text-left px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/40">Add Book</button>
                            <button onClick={() => { setOpen(false); router.push('/books/all_books') }} className="text-left px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/40">All Books</button>
                            <button onClick={() => { setOpen(false); router.push('/user/allUser') }} className="text-left px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700/40">All User</button>
                        </div>
                    </div>
                )}

                {/* Auth Buttons */}
                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleClick("logout")}
                            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg shadow-sm transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleClick("login")}
                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-all duration-200"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => handleClick("register")}
                            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg shadow-sm transition-all duration-200"
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
