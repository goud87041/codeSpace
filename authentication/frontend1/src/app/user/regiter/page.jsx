'use client';
import { useState } from "react";
import { useLoader } from "@/context/loader/loader.contex";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { isLoading, startLoading, stopLoading } = useLoader();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            stopLoading();
            return;
        }
        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            stopLoading();
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Registration failed");
                return;
            }

            setFormData({ userName: '', email: '', password: '', confirmPassword: '' });
            toast.success('User registered successfully');
            router.push("/user/login");

        } catch (error) {
            toast.error(error.message);
        } finally {
            stopLoading();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Name</label> <br />
                <input type="text" name="userName" placeholder="Name" value={formData.userName} onChange={handleChange} required /> <br />
                <label htmlFor="email">Email</label> <br />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> <br />
                <label htmlFor="password">Password</label> <br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /> <br />
                <label htmlFor="confirmPassword">Confirm Password</label> <br />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /> <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
                <button onClick = {()=>router.push('/user/login')}>login</button>
            </form>
        </div>
    );
}
