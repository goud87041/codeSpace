'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";
// import API from "../../../api/api.js"
import axios from "axios"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", {
                email,
                password,
            });
            const data = response.data;

            login({ token: data.token, user: data.user, expiresAt: data.expiresAt });
            toast.success("Logged in successfully");
            console.log("hello i am here")
            router.push("/");

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        router.push("/user/regiter")
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-md p-8 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl z-10">
                <div className="text-center mb-8">
                    <span className="text-4xl mb-2 inline-block">📖</span>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 text-sm mt-2">Sign in to manage your LibSys account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-slate-700/60 pt-6">
                    <p className="text-slate-400 text-sm">
                        Don't have an account?{" "}
                        <button
                            onClick={handleClick}
                            className="text-blue-400 hover:text-blue-300 font-semibold focus:outline-none hover:underline transition-all"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
