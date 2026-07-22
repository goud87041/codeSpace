'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth/auth.context";

export default function Home() {
  const { isAuthenticated, isLoading, logout, login } = useAuth();
  const router = useRouter();

  const handleClick = (route) => {
    if (route == "login") {
      router.push("/user/login")
    } else if (route == "register") {
      router.push("/user/regiter")
    } else if (route == "logout") {
      logout()

      router.push("/user/login")
    }
  }




  return (
    <>

      <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-800/90 backdrop-blur-md border-b border-slate-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

            {/* Logo / Brand Name */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span className="font-bold text-xl tracking-wider text-white">LibSys</span>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              <a

                onClick={() => navigator.push("/books/add_book")}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
              >
                Add Book
              </a>
              <a
                onClick={() => router.push("/books/all_books")}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
              >
                All Books
              </a>
              <a
                onClick={() => navigator.push("/books/all_assign_books")}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md transition-colors"
              >
                All Assign Books
              </a>
            </nav>

            {isAuthenticated ? (

              <div className="flex items-center gap-3">
                <button onClick={handleClick("logout")} className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg shadow-sm transition-all duration-200">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div>
                  <button onClick={handleClick("login")} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-all duration-200">
                    Login
                  </button>
                </div>
                <div>
                  <button onClick={handleClick("register")} className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg shadow-sm transition-all duration-200">
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Page / Hero Section */}
        <main className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
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
                href="#all-books"
                className="px-6 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all duration-200"
              >
                Browse Catalog
              </a>
              <a
                href="#add-book"
                className="px-6 py-3 text-base font-medium rounded-lg text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 backdrop-blur-sm transition-all duration-200"
              >
                + Add New Book
              </a>
            </div>
          </div>
        </main>
      </div>


    </>
  )
}
