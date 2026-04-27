"use client";
import BlogManager from "@/app/components/blog-manager";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center text-black">
            <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                    ← Orqaga
                </button>
                <h1 className="text-2xl font-bold">Barcha Bloglar</h1>
                <div className="w-25"></div>
            </div>

            <div className="w-full max-w-4xl">
                <BlogManager />
            </div>
        </div>
    );
}
