'use client';
import { useState, useEffect } from 'react'
import axios, { all } from "axios"
import API from "../../../api/api.js"
import AllBooksCompo from '@/components/allBooks/page.jsx';


export default function AllBooks() {

  const [allBook, setAllBook] = useState([])

  const featchAllBook = async () => {
    const res = await axios.get(`${API}/books/allBooks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    console.log(res.data)
    setAllBook(res.data.books || res.data.data || res.data)
  }

  useEffect(() => {
    featchAllBook()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">

      {/* Background glow blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">📚 All Books</h1>
            <p className="text-slate-400 text-sm mt-1">
              {allBook.length > 0
                ? `Showing ${allBook.length} book${allBook.length > 1 ? "s" : ""} in the catalog`
                : "Browse your entire book catalog"}
            </p>
          </div>

          {/* Stats pill */}
          {allBook.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
                ✅ {allBook.filter(b => !b.assign).length} Available
              </span>
              <span className="px-3 py-1.5 text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full">
                📌 {allBook.filter(b => b.assign).length} Assigned
              </span>
            </div>
          )}
        </div>

        {/* Empty State */}
        {allBook.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 flex items-center justify-center bg-slate-800/60 border border-slate-700 rounded-2xl">
              <span className="text-4xl">📭</span>
            </div>
            <h2 className="text-xl font-bold text-white">No books found</h2>
            <p className="text-slate-400 text-sm text-center max-w-sm">
              Your catalog is empty. Add a new book to get started.
            </p>
          </div>
        ) : (
          /* Book Grid */
          <div className="grid grid-cols-1  gap-5">
            {allBook.map((item) => (
              <AllBooksCompo key={item._id} data={item} onAnyChange={featchAllBook} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
