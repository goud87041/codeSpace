'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '@/api/api';


export default function AddUserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    userName: '',
    email: '',
    role: 'user',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post(`${API}/assignUser/addAssignUser`, form,
            {
                 headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
        })

        toast.success('User added successfully');
        router.push("/user/allUser")
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add user");
    }


  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">Add New User</h1>
       
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-slate-300 mb-1">Full Name <span className="text-rose-400">*</span></label>
              <input
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email <span className="text-rose-400">*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">Role <span className="text-rose-400">*</span></label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg text-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-700/50 flex gap-3">
              <button type="button" onClick={() => router.push('/user/allUser')} className="flex-1 py-2.5 px-4 bg-slate-700/60 text-slate-300 rounded-lg">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-lg">Create User</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
