import { invoke } from "@tauri-apps/api/core";

export interface SystemInfo {
    os: string;
    arch: string;
    version: string;
}

export const tauriApi = {
    greet: (name: string) => invoke<string>("greet", { name }),
    getSystemInfo: () => invoke<SystemInfo>("get_system_info"),
    longTask: (seconds: number) => invoke<string>("long_task", { seconds }),
};

export const isTauri = () => {
    return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
};
