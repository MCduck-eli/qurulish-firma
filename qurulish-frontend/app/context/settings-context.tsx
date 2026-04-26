"use client";
import { createContext, useContext, useState, useEffect } from "react";
import translations from "@/app/constants/locales/translation.json";

const SettingsContext = createContext<any>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState("uz");
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") || "uz";
        const savedTheme = localStorage.getItem("theme") || "light";
        setLang(savedLang);
        setTheme(savedTheme);
        if (savedTheme === "dark")
            document.documentElement.classList.add("dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark");
    };

    const changeLang = (l: string) => {
        setLang(l);
        localStorage.setItem("lang", l);
    };

    const t = translations[lang as "uz" | "ru"];

    return (
        <SettingsContext.Provider
            value={{ lang, theme, toggleTheme, changeLang, t }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
