"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useSettings } from "../context/settings-context";

export default function LoginPage() {
    const { theme } = useSettings();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const isDark = theme === "dark";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { username, password });
            if (res.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                router.push("/admin");
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Xatolik yuz berdi");
        }
    };

    return (
        <div
            className={`flex flex-col items-center justify-center h-screen transition-colors duration-500 
            ${isDark ? "bg-[#020617] text-white" : "bg-white text-black"}`}
        >
            <form
                onSubmit={handleLogin}
                className={`p-8 border rounded-xl shadow-2xl w-full max-w-sm transition-all duration-500
                    ${
                        isDark
                            ? "bg-[#0f172a]/50 border-slate-800 backdrop-blur-md"
                            : "bg-white border-gray-200 shadow-gray-200"
                    }`}
            >
                <h1
                    className={`mb-6 text-2xl font-black tracking-tight text-center uppercase
                    ${isDark ? "text-white" : "text-black"}`}
                >
                    Admin Panel
                </h1>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Login"
                            className={`w-full p-3 border rounded-lg outline-none transition-all
                                ${
                                    isDark
                                        ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                                        : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-blue-500"
                                }`}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Parol"
                            className={`w-full p-3 border rounded-lg outline-none transition-all
                                ${
                                    isDark
                                        ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                                        : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-blue-500"
                                }`}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className={`w-full p-3 rounded-lg font-bold uppercase tracking-widest transition-all active:scale-95
                        ${
                            isDark
                                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                                : "bg-black text-white hover:bg-gray-800 shadow-lg shadow-gray-300"
                        }`}
                    >
                        Kirish
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p
                        className={`text-xs font-medium uppercase tracking-tighter
                        ${isDark ? "text-slate-500" : "text-gray-400"}`}
                    >
                        BuildIQ Authentication System
                    </p>
                </div>
            </form>
        </div>
    );
}
