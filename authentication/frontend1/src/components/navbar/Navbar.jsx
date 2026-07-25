'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth/auth.context";

export default function Navbar() {
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo / Brand */}
                <div
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <span className="text-2xl">📖</span>
                    <span className="font-bold text-xl tracking-wider text-white">LibSys</span>
                </div>

                {/* Navigation Tabs */}
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
                        onClick={() => router.push("/user/allUser")}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
                    >
                        All User
                    </a>
                </nav>

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
