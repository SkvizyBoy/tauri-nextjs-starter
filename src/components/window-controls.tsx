"use client";

import { getCurrentWindow } from "@tauri-apps/api/window";
import { Copy, Minus, Square, X } from "lucide-react";
import { useEffect, useState } from "react";

export function WindowControls() {
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const appWindow = getCurrentWindow();

        appWindow.isMaximized().then(setIsMaximized);

        const unlisten = appWindow.onResized(async () => {
            setIsMaximized(await appWindow.isMaximized());
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const minimize = () => {
        if (typeof window !== "undefined") getCurrentWindow().minimize();
    };

    const toggleMaximize = () => {
        if (typeof window !== "undefined") getCurrentWindow().toggleMaximize();
    };

    const close = () => {
        if (typeof window !== "undefined") getCurrentWindow().close();
    };

    return (
        <div className="flex items-center h-full">
            <button
                onClick={minimize}
                className="h-full w-10 flex items-center justify-center hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 transition-colors"
                title="Свернуть"
            >
                <Minus className="w-4 h-4" />
            </button>

            <button
                onClick={toggleMaximize}
                className="h-full w-10 flex items-center justify-center hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 transition-colors"
                title={isMaximized ? "Восстановить" : "Развернуть"}
            >
                {isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
            </button>

            <button
                onClick={close}
                className="h-full w-10 flex items-center justify-center hover:bg-red-600 text-zinc-400 hover:text-white transition-colors"
                title="Закрыть"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
