"use client";

import AllUsers from "@/components/allUser/page";
import axios from "axios";
import API from "@/api/api";
import { useEffect, useState } from "react";


const AllUserPage = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API}/assignUser/allUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log('AllUser API response:', res.data);
            const payload = res.data?.data ?? res.data;
            if (Array.isArray(payload)) setData(payload);
            else if (payload) setData([payload]);
            else setData([]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-4 text-slate-300">Showing <span className="font-medium text-white">{data.length}</span> user{data.length !== 1 ? 's' : ''}</div>
                <AllUsers users={data} />
            </div>
        </main>
    );
};

export default AllUserPage;