"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";

interface ImageItem {
    preview: string;
    description: string;
    file?: File;
}
export default function EditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [title, setTitle] = useState("");
    const [mainDescription, setMainDescription] = useState("");
    const [imageItems, setImageItems] = useState<ImageItem[]>([]);
    const router = useRouter();
    useEffect(() => {
        api.get(`/blogs/${id}`)
            .then((res) => {
                if (res.data.success) {
                    const blog = res.data.data;
                    setTitle(blog.title);
                    setMainDescription(blog.description);
                    const existingImages = blog.images.map(
                        (img: string, index: number) => ({
                            preview: img,
                            description: blog.imageDescriptions[index] || "",
                        }),
                    );
                    setImageItems(existingImages);
                }
            })
            .catch(() => {
                toast.error("Ma'lumotni yuklab bo'lmadi");
            });
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                description: "",
            }));
            setImageItems((prev) => [...prev, ...filesArray]);
        }
    };
    const updateImageDescription = (index: number, text: string) => {
        const updatedItems = [...imageItems];
        updatedItems[index].description = text;
        setImageItems(updatedItems);
    };

    const removeImage = (index: number) => {
        setImageItems(imageItems.filter((_, i) => i !== index));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadingToast = toast.loading("Yangilanmoqda...");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", mainDescription);

        const descriptions: string[] = [];

        imageItems.forEach((item) => {
            if (item.file) {
                formData.append("images", item.file);
            } else {
                formData.append("existingImages", item.preview);
            }
            descriptions.push(item.description);
        });

        formData.append("imageDescriptions", JSON.stringify(descriptions));

        try {
            await api.put(`/blogs/${id}`, formData);
            toast.success("Obyekt yangilandi!", { id: loadingToast });
            router.push("/admin/blogs");
        } catch (err) {
            toast.error("Yangilashda xatolik", { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 flex flex-col items-center transition-colors">
            <Toaster position="top-center" />
            <div className="w-full max-w-2xl flex justify-between items-center mb-6 text-black dark:text-white">
                <h1 className="text-2xl font-bold">Obyektni tahrirlash</h1>
                <button
                    onClick={() => router.back()}
                    className="text-sm hover:underline"
                >
                    Orqaga qaytish
                </button>
            </div>

            <form
                onSubmit={handleUpdate}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200 dark:border-gray-700"
            >
                <div className="mb-4">
                    <label className="font-semibold text-black dark:text-white">
                        Ob'ekt nomi
                    </label>
                    <input
                        type="text"
                        className="w-full border p-3 rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-500 border-gray-300 dark:border-gray-600"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="font-semibold text-black dark:text-white">
                        Umumiy tavsif
                    </label>
                    <textarea
                        rows={3}
                        className="w-full border p-3 rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 text-black dark:text-white outline-none focus:border-blue-500 border-gray-300 dark:border-gray-600"
                        value={mainDescription}
                        onChange={(e) => setMainDescription(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="font-semibold text-black dark:text-white block mb-2">
                        Rasmlarni boshqarish
                    </label>
                    <input
                        type="file"
                        multiple
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>

                <div className="space-y-4 mb-6">
                    {imageItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 items-center border-gray-200 dark:border-gray-600"
                        >
                            <img
                                src={
                                    item.preview.startsWith("/")
                                        ? `http://192.168.0.160:5001${item.preview}`
                                        : item.preview
                                }
                                className="w-16 h-16 object-cover rounded"
                                alt="preview"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Rasm izohi..."
                                    className="w-full border p-2 rounded text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
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
                                className="text-red-500 font-bold p-2"
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
                    Saqlash
                </button>
            </form>
        </div>
    );
}
