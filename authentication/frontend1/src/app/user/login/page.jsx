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

            login({ token: data.token });
            toast.success("Logged in successfully");
            router.push("/");

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = ()=>{
        router.push("/user/regiter")
    }

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
                <button onClick = {handleClick}>register</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    );
}
