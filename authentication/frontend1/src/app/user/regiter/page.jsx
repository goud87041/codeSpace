'use client';
import { useState } from "react";
import { useLoader } from "@/context/loader/loader.contex";
import { toast } from "react-toastify";

export default function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {isLoading, startLoading, stopLoading} = useLoader();

    const handleSubmit = (e) => {
        console.log("i am here");
        console.log(formData);
        
        e.preventDefault();
        startLoading();
       if(formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        stopLoading();
        return;
       }
       if(formData.password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        stopLoading();
        return; 
       }

       setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
       });
       stopLoading();
       toast.success('User registered successfully');
    }
   

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label> <br />
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} /> <br />
                <label htmlFor="email">Email</label> <br />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /> <br />
                <label htmlFor="password">Password</label> <br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /> <br />
                <label htmlFor="confirmPassword">Confirm Password</label> <br />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} /> <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}