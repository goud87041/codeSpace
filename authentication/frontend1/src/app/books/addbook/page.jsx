'use client';

import { useLoader } from "@/context/loader/loader.contex";
import { useState } from "react";
import axios from "axios";
import API from "../../../api/api.js"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddBook() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        description: ""
    })

    const { isLoading, startLoading, stopLoading } = useLoader();
    // const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ Must be FIRST — prevents HTML form GET submission

        startLoading();
        try {
            const res = await axios.post(
                `${API}/books/addBook`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log(res);
            setFormData({ title: "", author: "", price: "", description: "" });
            router.push("/books/all_books");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add book");
        } finally {
            stopLoading();
        }
    }


    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans relative overflow-hidden">

            {/* Background glow blobs */}
            <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-xl z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-4">
                        <span className="text-3xl">📘</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Add New Book</h1>
                    <p className="text-slate-400 text-sm mt-2">Fill in the details to add a book to the catalog</p>
                </div>

                {/* Form Card */}
                <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Book Title <span className="text-rose-400">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={e => { handleChange(e) }}
                                placeholder="e.g. The Great Gatsby"
                                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Author <span className="text-rose-400">*</span>
                            </label>
                            <input
                                id="author"
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={e => { handleChange(e) }}
                                placeholder="e.g. F. Scott Fitzgerald"
                                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Price (₹) <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium select-none">₹</span>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={e => { handleChange(e) }}
                                    placeholder="0.00"
                                    min="0"
                                    className="w-full pl-8 pr-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">
                                Description <span className="text-slate-500 text-xs font-normal">(optional)</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={e => { handleChange(e) }}
                                placeholder="Write a short description about the book..."
                                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            />
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-700/60 pt-2" />

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex-1 py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                            >
                                Add Book
                            </button>
                        </div>

                    </form>
                </div>

                {/* Footer note */}
                <p className="text-center text-slate-500 text-xs mt-5">
                    Fields marked with <span className="text-rose-400">*</span> are required
                </p>

            </div>
        </div>
    );
}