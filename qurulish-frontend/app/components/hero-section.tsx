"use client";
import { useState } from "react";
import { useSettings } from "../context/settings-context";
import { FiX, FiInfo, FiSmartphone, FiMap, FiCpu } from "react-icons/fi";

export default function HeroSection() {
    const { theme, t } = useSettings();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isDark = theme === "dark";

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden mt-10">
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">
                        {t?.systemActive}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                    <span className={isDark ? "text-white" : "text-slate-900"}>
                        Build
                    </span>
                    <span className="text-blue-600">IQ</span>
                    <span
                        className={`block text-2xl md:text-4xl mt-2 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                        {t?.heroSubtitle}
                    </span>
                </h1>
                <p
                    className={`max-w-2xl mx-auto text-lg mb-10 leading-relaxed ${isDark ? "text-slate-500" : "text-slate-600"}`}
                >
                    {t?.heroDescription}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
                    >
                        <FiInfo /> {t?.newInfo}
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div
                        className={`relative w-full max-w-lg p-8 rounded-[2.5rem] border shadow-2xl animate-in zoom-in duration-300 ${
                            isDark
                                ? "bg-slate-900 border-slate-800 text-white"
                                : "bg-white border-slate-200 text-slate-900"
                        }`}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 p-2 hover:bg-slate-500/10 rounded-full transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <FiInfo className="text-blue-500" /> {t?.infoTitle}
                        </h2>

                        <div className="space-y-6 text-left">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                                    <FiMap size={24} />
                                </div>
                                <p
                                    className={`font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
                                >
                                    {t?.infoStep1}
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                                    <FiSmartphone size={24} />
                                </div>
                                <p
                                    className={`font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
                                >
                                    {t?.infoStep2}
                                </p>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                                    <FiCpu size={24} />
                                </div>
                                <p
                                    className={`font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
                                >
                                    {t?.infoStep3}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-10 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-colors shadow-lg"
                        >
                            {t?.close}
                        </button>
                    </div>
                </div>
            )}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        </section>
    );
}
