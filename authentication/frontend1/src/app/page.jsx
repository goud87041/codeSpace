'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">

      {/* Main Page / Hero Section */}
      <main className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://media.istockphoto.com/id/1339845062/photo/reading-room-or-library-interior-with-leather-armchair-bookshelf-and-floor-lamp.jpg?s=612x612&w=0&k=20&c=2ghOW2DCvb49Up3D0eFeVzv1kbSMjUq-_psohUYeZB0="
            alt="Library interior with cozy bookshelf reading room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-brightness-75" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            Smart Library System
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Manage your entire catalog, keep track of issued titles, and streamline member assignments with a modern digital dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              onClick={() => router.push("/books/all_books")}
              className="cursor-pointer px-6 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all duration-200"
            >
              Browse Catalog
            </a>
            <a
              onClick={() => router.push("/books/addBook")}
              className="cursor-pointer px-6 py-3 text-base font-medium rounded-lg text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 backdrop-blur-sm transition-all duration-200"
            >
              + Add New Book
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
