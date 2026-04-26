"use client";
import { FiMoon, FiSun, FiGlobe, FiCheck } from "react-icons/fi";
import { useSettings } from "../context/settings-context";

export default function SettingsPage() {
    const { lang, theme, toggleTheme, changeLang, t } = useSettings();

    if (!t) return null;

    const isDark = theme === "dark";

    const lightMode = {
        bg: "#F8FAFC",
        card: "#FFFFFF",
        text: "#1A202C",
        subText: "#718096",
        border: "#E2E8F0",
        btnBg: "#F1F5F9",
    };

    const darkMode = {
        bg: "#020617",
        card: "#0F172A",
        text: "#F8FAFC",
        subText: "#A0AEC0",
        border: "#1E293B",
        btnBg: "#1E293B",
    };

    const c = isDark ? darkMode : lightMode;

    return (
        <div
            style={{ backgroundColor: c.bg, color: c.text }}
            className="min-h-screen p-6 md:p-12 transition-all duration-500"
        >
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-black mb-10 tracking-tight uppercase">
                    {t.settings}
                </h1>

                <div className="space-y-6">
                    <div
                        style={{
                            backgroundColor: c.card,
                            borderColor: c.border,
                        }}
                        className="flex items-center justify-between p-6 rounded-[2rem] border shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-2xl">
                                {isDark ? (
                                    <FiMoon className="text-blue-400 text-xl" />
                                ) : (
                                    <FiSun className="text-blue-600 text-xl" />
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-lg">{t.theme}</p>
                                <p
                                    style={{ color: c.subText }}
                                    className="text-sm"
                                >
                                    {isDark ? t.on : t.off}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-500 ${isDark ? "bg-blue-600" : "bg-slate-300"}`}
                        >
                            <div
                                className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>

                    <div
                        style={{
                            backgroundColor: c.card,
                            borderColor: c.border,
                        }}
                        className="p-6 rounded-[2rem] border shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl">
                                <FiGlobe className="text-emerald-600 text-xl" />
                            </div>
                            <p className="font-bold text-lg">{t.lang}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {["uz", "ru"].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => changeLang(l)}
                                    style={{
                                        backgroundColor:
                                            lang === l ? "#EBF8FF" : c.btnBg,
                                        borderColor:
                                            lang === l ? "#3182CE" : c.border,
                                        color: lang === l ? "#3182CE" : c.text,
                                    }}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all font-bold group`}
                                >
                                    <span className="uppercase tracking-widest text-sm">
                                        {l === "uz" ? "O'zbekcha" : "Русский"}
                                    </span>
                                    {lang === l && (
                                        <FiCheck className="text-xl" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
