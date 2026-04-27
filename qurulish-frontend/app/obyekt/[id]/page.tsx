"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";

const BASE_URL = "https://qurulish-firma.onrender.com";

export default function ObyektView({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/blogs/${id}`, {
                    timeout: 10000,
                });

                if (res.data && res.data.success) {
                    setData(res.data.data);
                } else {
                    setError("Obyekt topilmadi");
                }
            } catch (err: any) {
                console.error("Xatolik tafsiloti:", err);
                setError(
                    err.response?.data?.message ||
                        (err.message === "Network Error"
                            ? "Backend bilan aloqa yo'q (Render uyg'onmoqda bo'lishi mumkin)"
                            : err.message),
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 font-bold dark:text-white">
                    Yuklanmoqda...
                </span>
            </div>
        );

    if (error)
        return (
            <div className="p-10 text-center text-red-500 font-bold dark:bg-gray-900 h-screen flex flex-col items-center justify-center">
                <p className="mb-4 text-xl">Xato: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Qayta urinish
                </button>
            </div>
        );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    {data?.title}
                </h1>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm md:text-base">
                        {data?.description && data.description.trim() !== ""
                            ? data.description
                            : "Ushbu obyekt bo'yicha qo'shimcha tavsif kiritilmagan."}
                    </p>
                </div>

                <h2 className="text-lg font-semibold mb-6 border-l-4 border-blue-500 pl-4">
                    Elektr sxemalari va rasmlar:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    {data?.images && data.images.length > 0 ? (
                        data.images.map((imgUrl: string, index: number) => (
                            <div
                                key={index}
                                className="flex flex-col rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="bg-white h-48 flex justify-center items-center p-2">
                                    <img
                                        src={`${BASE_URL}${imgUrl}`}
                                        alt={`Rasm ${index + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                {data.imageDescriptions &&
                                    data.imageDescriptions[index] && (
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex-grow">
                                            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-3">
                                                <span className="text-blue-500 mr-1">
                                                    ●
                                                </span>
                                                {data.imageDescriptions[index]}
                                            </p>
                                        </div>
                                    )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-400">
                            Rasmlar mavjud emas.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
