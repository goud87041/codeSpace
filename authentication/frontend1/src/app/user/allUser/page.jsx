"use client";

import AllUsers from "@/components/allUser/page";
import axios from "axios";
import { useEffect, useState } from "react";


const AllUserPage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const featchData = async () => {
            const res = await axios.get(`http://localhost:8080/api/user/allUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(res.data.data)
            setData(res.data.data)
        }

        featchData();
    }, [])

    return (
        <main>
            <AllUsers users={data} />
        </main>
    );
};

export default AllUserPage;