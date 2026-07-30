'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import API from "@/api/api";

export default function AssignBookToUserPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params?.id;

  const [book, setBook] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchBook = async () => {
    const res = await axios.get(`${API}/books/getBook/${bookId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data.book;
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/assignUser/allAssignUser`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data?.data ?? [];
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookData, usersData] = await Promise.all([fetchBook(), fetchUsers()]);
      setBook(bookData);
      setUsers(usersData);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load assignment details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bookId) return;
    loadData();
  }, [bookId]);

  const assignedUser = useMemo(() => {
    if (!book?.assign || !book?.user) return null;
    return users.find((u) => String(u._id) === String(book.user)) || null;
  }, [book, users]);

  const handleAssign = async () => {
    if (!selectedUserId) {
      toast.error("Please select a user to assign this book to");
      return;
    }
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${API}/books/assignBook`,
        { userId: selectedUserId, bookId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data?.message || "Book assigned successfully");
      router.push("/books/all_books");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to assign book");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveAssignment = async () => {
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API}/books/removeAssignedUser/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(res.data?.message || "Assignment removed successfully");
      router.push("/books/all_books");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove assignment");
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
          <p className="text-slate-400 text-sm mt-2">Review the book details and choose a user to assign it to.</p>
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
                  {book.assign ? "Assigned" : "Available"}
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

              {book.assign ? (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-amber-400 text-sm font-semibold mb-1">Currently assigned to</p>
                    <p className="text-slate-200 text-sm">
                      {assignedUser ? `${assignedUser.userName} (${assignedUser.email})` : "Unknown user"}
                    </p>
                  </div>

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
                      onClick={handleRemoveAssignment}
                      disabled={actionLoading}
                      className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Processing..." : "Remove Assignment"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm font-semibold">Select a user</p>

                  {users.length === 0 ? (
                    <div className="p-4 bg-slate-900/40 border border-slate-700/60 rounded-lg text-center space-y-3">
                      <p className="text-slate-400 text-sm">No users found.</p>
                      <button
                        type="button"
                        onClick={() => router.push("/user/addUser")}
                        className="py-2 px-4 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition-all"
                      >
                        Add a User
                      </button>
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                      {users.map((u) => (
                        <label
                          key={u._id}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedUserId === u._id
                              ? "bg-violet-600/15 border-violet-500/60"
                              : "bg-slate-900/40 border-slate-700/60 hover:border-slate-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="assignUser"
                            value={u._id}
                            checked={selectedUserId === u._id}
                            onChange={() => setSelectedUserId(u._id)}
                            className="accent-violet-600"
                          />
                          <div className="min-w-0">
                            <p className="text-slate-100 text-sm font-medium truncate">{u.userName}</p>
                            <p className="text-slate-400 text-xs truncate">{u.email}</p>
                          </div>
                        </label>
                      ))}
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
                      onClick={handleAssign}
                      disabled={actionLoading || !selectedUserId}
                      className="flex-1 py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Processing..." : "Assign"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
