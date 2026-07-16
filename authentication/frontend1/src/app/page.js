'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth/auth.context";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.push("/books/all_books");
    } else {
      router.push("/user/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return <p>Loading...</p>;
}
