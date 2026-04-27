"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import api from "@/lib/axios";

interface ImageItem {
    file: File;
    preview: string;
    description: string;
}

export default function AdminPage() {
    const [title, setTitle] = useState("");
    const [imageItems, setImageItems] = useState<ImageItem[]>([]);
    const [qrCode, setQrCode] = useState("");
    const [blogId, setBlogId] = useState("");
    const [mainDescription, setMainDescription] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get("/auth/verify-admin");
            } catch (error) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                description: "",
            }));
            setImageItems((prev) => [...prev, ...filesArray]);
            toast.success(`${filesArray.length} ta rasm qo'shildi`);
        }
    };

    const updateImageDescription = (index: number, text: string) => {
        const updatedItems = [...imageItems];
        updatedItems[index].description = text;
        setImageItems(updatedItems);
    };

    const removeImage = (index: number) => {
        setImageItems(imageItems.filter((_, i) => i !== index));
        toast.error("Rasm olib tashlandi");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadingToast = toast.loading("Ma'lumot saqlanmoqda...");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", mainDescription);

        const descriptions: string[] = [];
        imageItems.forEach((item) => {
            formData.append("images", item.file);
            descriptions.push(item.description);
        });
        formData.append("imageDescriptions", JSON.stringify(descriptions));

        try {
            const response = await api.post("/blogs", formData);

            if (response.data.success) {
                setQrCode(response.data.data.qrCode);
                setBlogId(response.data.data.id);
                toast.success("Muvaffaqiyatli saqlandi!", { id: loadingToast });
                setTitle("");
                setMainDescription("");
                setImageItems([]);
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || "Serverda xatolik!";
            toast.error(msg, { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center text-black">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-2xl flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Yangi Ob'ekt Qo'shish</h1>
                <button
                    onClick={() => router.push("/admin/blogs")}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
                >
                    Hamma bloglar
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl"
            >
                <div className="mb-4">
                    <label className="font-semibold">Ob'ekt nomi</label>
                    <input
                        type="text"
                        className="w-full border p-3 rounded-lg mt-1 bg-gray-50 text-black outline-none focus:border-blue-500"
                        placeholder="Masalan: Yunusobod 4-kvartal 12-uy"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-semibold">
                        Umumiy tavsif (Description)
                    </label>
                    <textarea
                        rows={3}
                        className="w-full border p-3 rounded-lg mt-1 bg-gray-50 text-black outline-none focus:border-blue-500"
                        placeholder="Ob'ekt haqida batafsil ma'lumot kiriting..."
                        value={mainDescription}
                        onChange={(e) => setMainDescription(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="font-semibold">Rasmlar yuklash</label>
                    <input
                        type="file"
                        multiple
                        className="w-full border p-2 rounded mt-1 bg-gray-50"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div className="space-y-4 mb-6">
                    {imageItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-4 p-4 border rounded-lg bg-gray-50 items-center"
                        >
                            <img
                                src={item.preview}
                                className="w-20 h-20 object-cover rounded"
                                alt="preview"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Ushbu rasmga izoh (masalan: Oshxona chirog'i)"
                                    className="w-full border p-2 rounded text-sm bg-white text-black"
                                    value={item.description}
                                    onChange={(e) =>
                                        updateImageDescription(
                                            index,
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="text-red-500 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Saqlash va QR Yaratish
                </button>
            </form>
            {qrCode && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-xl text-center border-2 border-green-500 w-full max-w-md">
                    <h2 className="font-bold mb-4 text-black text-xl">
                        Tayyor QR Kod
                    </h2>
                    <img
                        src={qrCode}
                        className="mx-auto w-48 h-48 border p-2 rounded-lg"
                        alt="QR"
                    />
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-dashed border-blue-400 text-center">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                            Ob'ekt ID:
                        </p>
                        <code className="text-lg font-mono text-blue-700">
                            {blogId}
                        </code>
                    </div>
                </div>
            )}
        </div>
    );
}
