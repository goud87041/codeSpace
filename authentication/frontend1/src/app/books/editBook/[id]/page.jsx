'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import API from "@/api/api";

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API}/books/getBook/${bookId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const book = response.data.book;
        setFormData({
          title: book.title || "",
          author: book.author || "",
          price: book.price ?? "",
          description: book.description || "",
        });
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to load book details");
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${API}/books/editBook/${bookId}`,
        {
          title: formData.title,
          author: formData.author,
          price: formData.price,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Book updated successfully");
      router.push("/books/all_books");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl mb-4">
            <span className="text-3xl">✏️</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Book</h1>
          <p className="text-slate-400 text-sm mt-2">Update the book details and save your changes.</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1.5">
                Book Title <span className="text-rose-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. The Great Gatsby"
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1.5">
                Author <span className="text-rose-400">*</span>
              </label>
              <input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-1.5">
                Price (₹) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">
                Description <span className="text-slate-500 text-xs font-normal">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the book..."
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            <div className="border-t border-slate-700/60 pt-2" />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/books/all_books")}
                className="flex-1 py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-slate-300 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
