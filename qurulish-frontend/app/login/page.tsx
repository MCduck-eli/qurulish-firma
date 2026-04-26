"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { username, password });
            if (res.data.success) {
                router.push("/admin"); // Muvaffaqiyatli bo'lsa admin panelga
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Xatolik yuz berdi");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form
                onSubmit={handleLogin}
                className="p-8 border rounded shadow-md"
            >
                <h1 className="mb-4 text-2xl font-bold">Admin Kirish</h1>
                <input
                    type="text"
                    placeholder="Login"
                    className="w-full p-2 mb-4 border rounded color-black text-black"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Parol"
                    className="w-full p-2 mb-4 border rounded text-black"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full p-2 text-white bg-blue-500 rounded">
                    Kirish
                </button>
            </form>
        </div>
    );
}
