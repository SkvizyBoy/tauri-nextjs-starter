"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WindowControls } from "@/components/window-controls";
import { isTauri, tauriApi, type SystemInfo } from "@/lib/tauri";
import { Box, Cpu, Globe, Monitor, Sparkles, Terminal } from "lucide-react";
import * as motion from "motion/react-client"; // Импорт анимаций
import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => { };
const useIsClient = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

export default function Home() {
  const [name, setName] = useState("Мир");
  const [greeting, setGreeting] = useState("");
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (isTauri()) {
      tauriApi.getSystemInfo().then(setInfo).catch(console.error);
    }
  }, []);

  async function handleGreet() {
    if (!isTauri()) {
      setGreeting("Запусти через npm run tauri:dev, чтобы увидеть магию Rust!");
      return;
    }
    try {
      const res = await tauriApi.greet(name);
      setGreeting(res);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Декоративный фон (свечение) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Шапка */}
      {/* Шапка */}
      {/* Шапка */}
      <header
        data-tauri-drag-region
        className="w-full border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 flex items-center justify-between"
      >
        <div data-tauri-drag-region className="flex-1 flex items-center px-4 h-10">
          <div className="flex items-center gap-2 font-semibold text-sm pointer-events-none">
            <Box className="w-4 h-4 text-primary" />
            <span>Tauri Starter</span>
          </div>
        </div>

        <div className="flex items-center h-10">
          <div className="flex items-center gap-0.5 mr-1">
            <ThemeToggle />
            <a
              href="https://github.com/SkvizyBoy"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              title="Мой GitHub"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          <WindowControls />
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Tauri + Next.js
            </h1>
            <p className="text-muted-foreground">
              Готовый шаблон для десктопных приложений с нативным бэкендом на Rust.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-6"
          >
            {/* Карточка с Rust командой */}
            <Card className="p-6 bg-card border-border backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 text-card-foreground">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <h2 className="font-semibold">Вызов Rust-команды</h2>
              </div>

              <div className="flex gap-3">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя..."
                  className="bg-background border-border focus-visible:ring-emerald-500"
                />
                <Button onClick={handleGreet} className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Вызвать
                </Button>
              </div>

              {greeting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-300 text-sm font-mono flex items-start gap-3"
                >
                  <Terminal className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{greeting}</p>
                </motion.div>
              )}
            </Card>

            {/* Карточка с информацией о системе */}
            {info && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-card border-border flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><Monitor className="w-5 h-5 text-blue-500" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">OS</p>
                    <p className="font-semibold text-card-foreground">{info.os}</p>
                  </div>
                </Card>

                <Card className="p-4 bg-card border-border flex items-center gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg"><Cpu className="w-5 h-5 text-purple-500" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Arch</p>
                    <p className="font-semibold text-card-foreground">{info.arch}</p>
                  </div>
                </Card>

                <Card className="p-4 bg-card border-border flex items-center gap-4">
                  <div className="p-2 bg-orange-500/10 rounded-lg"><Box className="w-5 h-5 text-orange-500" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Version</p>
                    <p className="font-semibold text-card-foreground">v{info.version}</p>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>

          {isClient && !isTauri() && (
            <p className="text-center text-sm text-amber-500 bg-amber-500/10 py-2 px-4 rounded-full border border-amber-500/20 inline-block mx-auto">
              Сейчас ты в браузере. Запусти <code>npm run tauri:dev</code>.
            </p>
          )}
        </div>
      </main>

      {/* Футер */}
      <footer className="w-full py-6 text-center text-sm text-muted-foreground relative z-10">
        <p className="flex items-center justify-center gap-1">
          Сделано с <span className="text-red-500">❤️</span> от SkvizyBoy
        </p>
      </footer>
    </div>
  );
}
