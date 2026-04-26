"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";

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

    const SERVER_IP = "192.168.1.102";
    const PORT = "5001";

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://${SERVER_IP}:${PORT}/api/blogs/${id}`,
                    {
                        timeout: 5000,
                    },
                );
                if (res.data && res.data.success) {
                    setData(res.data.data);
                } else {
                    setError("Obyekt topilmadi");
                }
            } catch (err: any) {
                setError(
                    err.message === "Network Error"
                        ? "Backend bilan aloqa yo'q (CORS yoki IP xato)"
                        : err.message,
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Yuklanmoqda...</div>;
    if (error)
        return (
            <div className="p-10 text-center text-red-500 font-bold">
                Xato: {error}
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>

            {/* Description bor-yo'qligini tekshirish */}
            <div className="bg-gray-50 p-4 rounded-xl mb-8">
                <p className="text-gray-700 whitespace-pre-wrap">
                    {data?.description && data.description.trim() !== ""
                        ? data.description
                        : "Ushbu obyekt bo'yicha qo'shimcha tavsif kiritilmagan."}
                </p>
            </div>

            <h2 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">
                Elektr sxemalari va rasmlar:
            </h2>

            <div className="grid grid-cols-1 gap-8">
                {data?.images && data.images.length > 0 ? (
                    data.images.map((imgUrl: string, index: number) => (
                        <div
                            key={index}
                            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                        >
                            <img
                                src={`http://${SERVER_IP}:${PORT}${imgUrl}`}
                                alt={`Rasm ${index + 1}`}
                                className="w-full h-auto"
                            />
                            {/* Agar rasmga izohlar bo'lsa (imageDescriptions) shu yerga qo'shish mumkin */}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-100 rounded-2xl text-gray-400">
                        Bu yerda rasmlar mavjud emas.
                    </div>
                )}
            </div>
        </div>
    );
}
