'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth/auth.context";
import { useRouter } from "next/navigation";

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
            // fix: correct API path, add Content-Type header
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // fix: handle non-2xx responses
            if (!response.ok) {
                setError(data.message || "Login failed");
                toast.error(data.message || "Login failed");
                return;
            }

            // fix: save token via auth context and redirect
            login({ token: data.token });
            toast.success("Logged in successfully");
            router.push("/");

        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    );
}
