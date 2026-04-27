"use client";
import { useState, useEffect, useMemo } from "react";
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

    const energyPaths = useMemo(() => {
        const paths = [];
        const rowIndices = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        const colIndices = [2, 4, 6, 8, 10, 12, 14, 16, 18];

        for (const rowIdx of rowIndices) {
            for (const colIdx of colIndices) {
                if (Math.random() > 0.5) continue;
                paths.push({
                    id: `${rowIdx}-${colIdx}`,
                    x: colIdx * cellSize,
                    y: rowIdx * cellSize,
                    duration: 3 + Math.random() * 4,
                    delay: Math.random() * -10,
                });
            }
        }
        return paths;
    }, [cellSize]);

    return (
        <div
            style={{ backgroundColor: bgColor }}
            className="relative min-h-screen w-full transition-colors duration-700"
        >
            <style jsx>{`
                .fixed-bg {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                }

                .cable-energy {
                    fill: none;
                    stroke-width: 2.5;
                    stroke-dasharray: 80 320;
                    animation:
                        flow linear infinite,
                        pulse 0.5s ease-in-out infinite alternate;
                }

                @keyframes flow {
                    from {
                        stroke-dashoffset: 400;
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes pulse {
                    0% {
                        opacity: 0.4;
                        filter: drop-shadow(0 0 2px ${energyColor});
                    }
                    100% {
                        opacity: 1;
                        filter: drop-shadow(0 0 5px ${energyColor})
                            brightness(1.3);
                    }
                }
            `}</style>

            <div className="fixed-bg opacity-70">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <path
                        d={Array.from({ length: rows + 1 })
                            .map(
                                (_, i) =>
                                    `M 0 ${i * cellSize} L 1000 ${i * cellSize} M ${i * cellSize} 0 L ${i * cellSize} 1000`,
                            )
                            .join(" ")}
                        stroke={gridColor}
                        strokeWidth="0.5"
                        fill="none"
                    />
                    {isMounted &&
                        energyPaths.map((p) => (
                            <rect
                                key={p.id}
                                x={p.x}
                                y={p.y}
                                width={cellSize}
                                height={cellSize}
                                stroke={energyColor}
                                className="cable-energy"
                                style={{
                                    animationDuration: `${p.duration}s, 0.5s`,
                                    animationDelay: `${p.delay}s, ${Math.random()}s`,
                                }}
                            />
                        ))}
                </svg>
            </div>

            <div className="relative z-10 w-full">
                <HeroSection />
                <div className="h-[20vh]" />
            </div>
        </div>
    );
}
