"use client";

import AllUsers from "@/components/allUser/page";
import axios from "axios";
import { toast } from "react-toastify";
import API from "@/api/api";
import { useEffect, useState } from "react";


const AllUserPage = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API}/assignUser/allAssignUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const payload = res.data?.data ?? res.data;
            if (Array.isArray(payload)) setData(payload);
            else if (payload) setData([payload]);
            else setData([]);
        } catch (error) {
            console.error(error);
        }
    };

    const removeUser = async (id) => {
        try {
            await axios.delete(`${API}/assignUser/removeUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("User removed successfully");
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove user");
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-4 text-slate-300">Showing <span className="font-medium text-white">{data.length}</span> user{data.length !== 1 ? 's' : ''}</div>
                <AllUsers users={data} onDelete={removeUser} />
            </div>
        </main>
    );
};

export default AllUserPage;