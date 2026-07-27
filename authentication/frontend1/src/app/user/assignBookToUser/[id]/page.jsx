'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import API from "@/api/api";

const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.id || null;
  } catch {
    return null;
  }
};

export default function AssignBookToUserPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params?.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const currentUserId = getCurrentUserId();

  const fetchBook = async () => {
    try {
      const res = await axios.get(`${API}/books/getBook/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBook(res.data.book);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bookId) return;
    fetchBook();
  }, [bookId]);

  const isMine = book?.assign && currentUserId && String(book.user) === String(currentUserId);
  const isAssignedToOther = book?.assign && !isMine;

  const handleToggleAssign = async () => {
    setActionLoading(true);
    try {
      const res = await axios.patch(
        `${API}/books/assignBook/${bookId}`,
        null,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data?.message || "Book updated successfully");
      router.push("/books/all_books");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update book assignment");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-600/20 border border-violet-500/30 rounded-2xl mb-4">
            <span className="text-3xl">📌</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Assign Book</h1>
          <p className="text-slate-400 text-sm mt-2">Review the book details and confirm assignment.</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl p-8">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            </div>
          ) : !book ? (
            <div className="text-center py-6 space-y-4">
              <p className="text-slate-400">Book not found.</p>
              <button
                type="button"
                onClick={() => router.push("/books/all_books")}
                className="py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg transition-all"
              >
                Back to All Books
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-white leading-tight">{book.title}</h2>
                <span
                  className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    book.assign
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {book.assign ? (isMine ? "Assigned to you" : "Assigned") : "Available"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>✍️</span>
                <span>{book.author}</span>
              </div>

              {book.description && (
                <p className="text-slate-400 text-sm leading-relaxed">{book.description}</p>
              )}

              <div className="flex items-center justify-between border-t border-slate-700/60 pt-4">
                <span className="text-blue-400 font-bold text-lg">₹{book.price}</span>
              </div>

              {isAssignedToOther && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm">
                  This book is already assigned to another user.
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/books/all_books")}
                  className="flex-1 py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleToggleAssign}
                  disabled={actionLoading || isAssignedToOther}
                  className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading
                    ? "Processing..."
                    : isMine
                    ? "Return Book"
                    : isAssignedToOther
                    ? "Unavailable"
                    : "Assign to Me"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
