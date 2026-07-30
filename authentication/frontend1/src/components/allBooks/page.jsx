import API from "@/api/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AllBooksCompo({ data , allBookData}) {
    const router = useRouter();
    const handleClick = async (whichFunction, id) => {

        if (whichFunction === "edit") {
            router.push(`/books/editBook/${data._id}`);
        }
        else if (whichFunction === "delete") {
            await axios.post(
                `${API}/books/deleteBook/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
        

            allBookData()
        }
        else if (whichFunction === "assign") {
           router.push(`/user/assignBookToUser/${id}`)
        }

    }





    return (
        <div  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-xl p-5 flex flex-col gap-3 hover:border-blue-500/40 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">

            {/* Top row — title + assign badge */}
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-white font-bold text-lg leading-tight line-clamp-2 flex-1">
                    {data.title}
                </h2>
                <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${data.assign
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    }`}>
                    {data.assign ? "Assigned" : "Available"}
                </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>✍️</span>
                <span className="truncate">{data.author}</span>
            </div>

            {/* Description */}
            <div className="flex items-between justify-between">
                <div>
                    {data.description && (
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                            {data.description}
                        </p>
                    )}
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => handleClick("assign", data._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-500/60 rounded-lg transition-all duration-200"
                    >
                        📌 Assign
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/50 mt-1" />

            {/* Bottom row — price + action buttons */}
            <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold text-lg">
                    ₹{data.price}
                </span>

                <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <button
                        type="button"
                        onClick={() => handleClick("edit", data._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-700/60 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-200"
                    >
                        ✏️ Edit
                    </button>

                    {/* Delete Button */}
                    <button
                        type="button"
                        onClick={() => handleClick("delete", data._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/50 rounded-lg transition-all duration-200"
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllBooksCompo;