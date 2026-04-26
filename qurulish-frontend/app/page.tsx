"use client";
import { useState, useEffect } from "react";
import HeroSection from "./components/hero-section";
import { useSettings } from "./context/settings-context";

export default function Page() {
    const { theme } = useSettings();
    const [isMounted, setIsMounted] = useState(false);
    const isDark = theme === "dark";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const bgColor = isDark ? "#020617" : "#F8FAFC";
    const gridColor = isDark ? "#1e293b" : "#e2e8f0";
    const energyColor = isDark ? "#3b82f6" : "#2563eb";
    const rows = 20;
    const cols = 20;
    const cellSize = 1000 / rows;

    return (
        <div
            style={{ backgroundColor: bgColor }}
            className="relative min-h-screen w-full overflow-hidden transition-colors duration-700"
        >
            <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter
                            id="energyGlow"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                        >
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient
                            id="energyGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor={energyColor} />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>

                    {Array.from({ length: rows + 1 }).map((_, i) => (
                        <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * cellSize}
                            x2="1000"
                            y2={i * cellSize}
                            stroke={gridColor}
                            strokeWidth="1"
                        />
                    ))}
                    {Array.from({ length: cols + 1 }).map((_, i) => (
                        <line
                            key={`v-${i}`}
                            x1={i * cellSize}
                            y1="0"
                            x2={i * cellSize}
                            y2="1000"
                            stroke={gridColor}
                            strokeWidth="1"
                        />
                    ))}
                    {isMounted &&
                        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((rowIdx) =>
                            [2, 4, 6, 8, 10, 12, 14, 16, 18].map((colIdx) => {
                                const x = colIdx * cellSize;
                                const y = rowIdx * cellSize;
                                const pathData = `M ${x} ${y} L ${x + cellSize} ${y} L ${x + cellSize} ${y + cellSize} L ${x} ${y + cellSize} Z`;
                                const randomDuration = `${3 + Math.random() * 2}s`;

                                return (
                                    <g key={`${rowIdx}-${colIdx}`}>
                                        <path
                                            d={pathData}
                                            fill="none"
                                            stroke="url(#energyGrad)"
                                            strokeWidth="2"
                                            strokeDasharray="50 150"
                                        >
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                from="400"
                                                to="0"
                                                dur={randomDuration}
                                                repeatCount="indefinite"
                                            />
                                        </path>
                                        <circle
                                            r="2"
                                            fill={energyColor}
                                            filter="url(#energyGlow)"
                                        >
                                            <animateMotion
                                                path={pathData}
                                                dur={randomDuration}
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                    </g>
                                );
                            }),
                        )}
                </svg>
            </div>
            <div className="relative z-10 w-full">
                <HeroSection />
            </div>
        </div>
    );
}
