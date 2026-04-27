"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function BlogManager() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await api.get("/blogs");
            if (res.data.success) {
                setBlogs(res.data.data);
            }
        } catch (err) {
            console.error("Xatolik:", err);
            toast.error("Ma'lumotlarni yuklashda xato");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("O'chirilsinmi?")) return;
        try {
            await api.delete(`/blogs/${id}`);
            toast.success("O'chirildi");
            fetchBlogs();
        } catch (err) {
            toast.error("O'chirishda xato");
        }
    };
    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-lg mt-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-black">
                Mavjud Obyektlar Ro'yxati
            </h2>

            <div className="space-y-4">
                {loading ? (
                    <div className="p-10 text-center text-gray-500 font-medium">
                        Yuklanmoqda...
                    </div>
                ) : blogs.length > 0 ? (
                    blogs.map((blog: any) => (
                        <div
                            key={blog._id}
                            className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 text-black"
                        >
                            <div>
                                <p className="font-bold">{blog.title}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(
                                        blog.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() =>
                                        router.push(`/admin/edit/${blog._id}`)
                                    }
                                    className="text-blue-600 font-medium text-sm hover:underline"
                                >
                                    Tahrirlash
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="text-red-600 font-medium text-sm hover:underline"
                                >
                                    O'chirish
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-10">
                        Hali hech narsa qo'shilmagan.
                    </p>
                )}
            </div>
        </div>
    );
}
