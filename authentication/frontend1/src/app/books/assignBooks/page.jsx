"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "@/api/api";

export default function AssignBooks() {

    const [allAssignBook, setAllAssignBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleClick = async (id)=>{
        await axios.delete(`${API}/books/removeAssignedUser/${id}`,
          {  headers : 
            {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
          }
          
        ).then(
            res=>{console.log(res.data);getAllAssignBook()}
        )
    }

    const getAllAssignBook = async () => {
        try {
            const res = await axios.get(`${API}/books/allAssignBooks`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setAllAssignBook(res.data.data || [])
        } catch (error) {
            console.error("Error fetching assigned books:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllAssignBook()
    }, [])

    return (
        <div className="min-h-screen p-8 bg-slate-900">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        Assigned Books
                    </h1>
                    <p className="text-slate-400 text-sm">
                        View and manage all books that are currently assigned.
                    </p>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : allAssignBook.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allAssignBook.map((book, index) => (
                            <div
                                key={book._id || index}
                                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-xl p-5 flex flex-col gap-4 hover:border-emerald-500/40 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
                                        {book.title || "Unknown Title"}
                                    </h2>
                                    <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                        Assigned
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <span>👤</span>
                                    <span className="truncate">{book.assignedTo || "Unknown User"}</span>
                                </div>

                                {book.description && (
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                        {book.description}
                                    </p>
                                )}

                                <div className="border-t border-slate-700/50 mt-auto pt-4 flex items-center justify-between">
                                    <span className="text-blue-400 font-bold text-sm">
                                        Due: {book.dueDate || "N/A"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleClick(book._id)}
                                        className="px-3 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 rounded-lg transition-all duration-200"
                                    >
                                        Revoke
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
                        <div className="text-5xl mb-2">📚</div>
                        <h3 className="text-xl font-semibold text-white">No Assigned Books</h3>
                        <p className="text-slate-400 max-w-md">
                            There are currently no books assigned. When books are assigned, they will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}