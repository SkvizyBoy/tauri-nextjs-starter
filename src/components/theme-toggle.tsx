"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => { };
const useIsClient = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const isClient = useIsClient();

    if (!isClient) {
        return <Button variant="ghost" size="icon" className="w-8 h-8" />;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-8 h-8"
            title="Сменить тему"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-zinc-400 hover:text-zinc-50 transition-colors" />
            ) : (
                <Moon className="h-4 w-4 text-zinc-500 hover:text-zinc-900 transition-colors" />
            )}
        </Button>
    );
}
