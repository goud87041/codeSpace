"use client";

import AllUsers from "@/components/allUser/page";
import axios from "axios";
import API from "@/api/api";
import { useEffect, useState } from "react";


const AllUserPage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const featchData = async () => {
            try {
                const res = await axios.get(`${API}/user/allUser`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setData(res.data.data || []);
            } catch (error) {
                console.error(error);
            }
        };

        featchData();
    }, []);

    return (
        <main>
            <AllUsers users={data} />
        </main>
    );
};

export default AllUserPage;