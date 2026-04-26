"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    FiMenu,
    FiX,
    FiHome,
    FiSearch,
    FiGrid,
    FiSettings,
    FiHash,
} from "react-icons/fi";
import { useSettings } from "../context/settings-context";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [objectId, setObjectId] = useState("");
    const { theme, t } = useSettings();

    useEffect(() => {
        if (isSearchOpen) {
            const scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false,
            );

            scanner.render(
                (decodedText) => {
                    setObjectId(decodedText);
                    handleSearch(decodedText);
                    scanner.clear();
                },
                (error) => {},
            );

            return () => {
                scanner
                    .clear()
                    .catch((err) => console.error("Scanner clear error", err));
            };
        }
    }, [isSearchOpen]);

    const handleSearch = (id?: string) => {
        const finalId = id || objectId;
        if (finalId) {
            window.location.href = `/obyekt/${finalId}`;
        }
    };

    if (!t) return null;

    const isDark = theme === "dark";
    const c = {
        nav: isDark
            ? "bg-[#020617] border-slate-800"
            : "bg-white border-slate-200",
        logo: isDark ? "text-white" : "text-slate-900",
        link: isDark
            ? "text-slate-400 hover:text-white"
            : "text-slate-500 hover:text-slate-900",
        modal: isDark
            ? "bg-[#0F172A] border-slate-800"
            : "bg-white border-slate-200",
        input: isDark
            ? "bg-slate-900 border-slate-700 text-white"
            : "bg-slate-50 border-slate-200 text-slate-900",
    };

    return (
        <>
            <nav
                className={`${c.nav} border-b sticky top-0 z-50 shadow-sm transition-colors duration-500`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="shrink-0 flex items-center gap-2"
                            >
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FiGrid className="text-white text-xl" />
                                </div>
                                <span
                                    className={`text-2xl font-black tracking-tighter ${c.logo}`}
                                >
                                    Build
                                    <span className="text-blue-600">IQ</span>
                                </span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 h-16 px-1"
                            >
                                <FiSearch /> {t.findObject}
                            </button>
                            <Link
                                href="/"
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${c.link}`}
                            >
                                <FiHome /> {t.home}
                            </Link>
                            <Link
                                href="/settings"
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${c.link}`}
                            >
                                <FiSettings /> {t.settings}
                            </Link>
                        </div>

                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`inline-flex items-center justify-center p-2 rounded-md outline-none transition-colors ${isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-400 hover:bg-slate-100"}`}
                            >
                                {isOpen ? (
                                    <FiX className="text-2xl" />
                                ) : (
                                    <FiMenu className="text-2xl" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div
                        className={`md:hidden border-t ${isDark ? "bg-[#0F172A]" : "bg-white"} animate-in slide-in-from-top duration-200`}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-blue-600 flex items-center gap-3"
                            >
                                <FiSearch /> {t.findObject}
                            </button>
                            <Link
                                href="/"
                                className={`px-3 py-3 rounded-md text-base font-medium flex items-center gap-3 transition-colors ${c.link}`}
                            >
                                <FiHome /> {t.home}
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {isSearchOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div
                        className={`relative w-full max-w-md p-6 rounded-3xl border shadow-2xl ${c.modal}`}
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-500/10 transition-colors"
                        >
                            <FiX className="text-xl" />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold mb-2">
                                {t.findObjectTitle}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {t.findObjectDesc}
                            </p>
                        </div>
                        <div
                            id="reader"
                            className="overflow-hidden rounded-2xl mb-6 bg-black/5"
                        ></div>

                        <div className="space-y-4">
                            <div className="relative">
                                <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={t.objectIdPlaceholder}
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none focus:border-blue-500 transition-all ${c.input}`}
                                    value={objectId}
                                    onChange={(e) =>
                                        setObjectId(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                onClick={() => handleSearch()}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                            >
                                <FiSearch /> {t.searchBtn}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
