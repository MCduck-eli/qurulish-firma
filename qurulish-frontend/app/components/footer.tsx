"use client";
import Link from "next/link";
import { useSettings } from "../context/settings-context";
import { FaTelegramPlane, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    const { theme, t } = useSettings();
    const isDark = theme === "dark";

    const socialLinks = [
        {
            icon: <FaTelegramPlane />,
            href: "https://t.me/e_halikov",
            color: "hover:text-[#229ED9]",
        },
        {
            icon: <FaInstagram />,
            href: "https://www.instagram.com/eldor.halikov/",
            color: "hover:text-[#E1306C]",
        },
        {
            icon: <FaLinkedinIn />,
            href: "https://www.linkedin.com/in/eldorjon-abdukholikov/",
            color: "hover:text-[#0077B5]",
        },
    ];

    return (
        <footer
            className={`relative z-10 w-full py-12 px-6 border-t mt-20 ${
                isDark
                    ? "bg-slate-950/50 border-slate-800"
                    : "bg-white/50 border-slate-200"
            } backdrop-blur-md`}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <p
                        className={`text-sm uppercase tracking-[0.2em] mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                        {t?.createdBy}
                    </p>
                    <h3
                        className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        Eldor <span className="text-blue-600">Khalikov</span>
                    </h3>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                        <span
                            className={`font-bold tracking-tighter text-xl ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            BuildIQ
                        </span>
                        <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                    </div>
                    <p
                        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                        © {new Date().getFullYear()} {t?.rightsReserved}
                    </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-3">
                    <p
                        className={`text-sm font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                        {t?.contactMe}
                    </p>
                    <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <Link
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-12 h-12 flex items-center justify-center rounded-2xl border text-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                                    isDark
                                        ? "border-slate-800 bg-slate-900 text-slate-400 hover:border-blue-500"
                                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-500"
                                } ${social.color}`}
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-600/50 to-transparent"></div>
        </footer>
    );
}
