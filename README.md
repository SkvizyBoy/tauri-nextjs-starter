<p align="center">
	<a href="https://tauri.app/"><img src="https://img.shields.io/badge/Tauri-v2-24C8DB?style=flat-square&logo=tauri&logoColor=white" alt="Tauri v2"></a>
	<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16"></a>
	<a href="https://www.rust-lang.org/"><img src="https://img.shields.io/badge/Rust-1.90+-orange?style=flat-square&logo=rust&logoColor=white" alt="Rust"></a>
	<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-20+-green?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"></a>
	<img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT License">
	<a href="https://github.com/SkvizyBoy/tauri-nextjs-starter/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome"></a>
</p>

<h1 align="center">Tauri + Next.js Ultimate Starter</h1>

<p align="center">
	Премиальная отправная точка для быстрых, лёгких и кроссплатформенных десктопных приложений — с современным веб-интерфейсом и нативной мощью Rust.
</p>

<!-- Вставьте скриншот приложения сюда -->

## ✨ Почему этот шаблон?

- ⚡ **Лёгкая альтернатива Electron.** Tauri использует системный WebView вместо поставки отдельного Chromium, а нативная часть написана на Rust. Размер собранного приложения может быть около **10 МБ** — итог зависит от платформы и ресурсов проекта.
- 🦀 **Tauri v2 + Rust.** Нативные команды, доступ к возможностям ОС и готовый мост между интерфейсом и бэкендом.
- ⚛️ **Современный фронтенд.** Next.js 16 с App Router, React 19 и TypeScript.
- 🎨 **Готовая UI-основа.** Tailwind CSS v4, компоненты в стиле shadcn/ui и библиотека анимаций Motion.
- 🌗 **Темы из коробки.** Переключение Dark/Light и поддержка системной темы через `next-themes`.
- 🪟 **Кастомное окно.** Собственный заголовок с кнопками свернуть, развернуть и закрыть; окно можно перетаскивать за шапку.
- 🔗 **Примеры Rust-команд.** Уже подключены `greet`, `get_system_info` и асинхронная `long_task`.
- 📦 **Релизы для трёх платформ.** GitHub Actions собирает Windows, macOS и Linux при push тега `v*` и создаёт черновик релиза с установщиками.

## 🛠 Требования

| Инструмент | Версия / примечание |
| --- | --- |
| Node.js и npm | Node.js 20 или новее; npm входит в установку Node.js |
| Rust и Cargo | Rust 1.90+ через [rustup](https://rustup.rs/) |
| Git | Для клонирования репозитория |
| Windows | Microsoft C++ Build Tools (рабочая нагрузка **Desktop development with C++**) и WebView2 |
| macOS | Xcode Command Line Tools |
| Linux | Системные библиотеки WebKitGTK и GTK; для Debian/Ubuntu см. команду ниже |

Пример установки системных пакетов для Ubuntu 24.04:

```bash
sudo apt update
sudo apt install -y build-essential curl wget file libssl-dev libayatana-appindicator3-dev librsvg2-dev libwebkit2gtk-4.1-dev libxdo-dev pkg-config patchelf
```

Для других дистрибутивов, а также актуальных инструкций по настройке платформы см. [официальное руководство Tauri](https://tauri.app/start/prerequisites/).

## 🚀 Быстрый старт

```bash
git clone https://github.com/SkvizyBoy/tauri-nextjs-starter.git
cd tauri-nextjs-starter
npm install
npm run tauri:dev
```


## 🔗 Как это работает: мост React ↔ Rust

Rust-команды находятся в `src-tauri/src/commands.rs`. Tauri регистрирует их в `src-tauri/src/lib.rs`, после чего фронтенд может вызывать их через `invoke`.

Пример команды `greet` и сериализуемого результата `get_system_info` из `commands.rs`:

```rust
use serde::Serialize;

#[derive(Serialize)]
pub struct SystemInfo {
		pub os: String,
		pub arch: String,
		pub version: String,
}

#[tauri::command]
pub fn greet(name: &str) -> String {
		format!("Привет, {}! 👋 Это ответ из Rust.", name)
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
		SystemInfo {
				os: std::env::consts::OS.to_string(),
				arch: std::env::consts::ARCH.to_string(),
				version: env!("CARGO_PKG_VERSION").to_string(),
		}
}
```

Типизированная обёртка из `src/lib/tauri.ts`:

```typescript
import { invoke } from "@tauri-apps/api/core";

export interface SystemInfo {
	os: string;
	arch: string;
	version: string;
}

export const tauriApi = {
	greet: (name: string) => invoke<string>("greet", { name }),
	getSystemInfo: () => invoke<SystemInfo>("get_system_info"),
};
```

`invoke` возвращает Promise. Имена команд в вызовах должны совпадать с именами Rust-функций, а команды — быть зарегистрированы через `tauri::generate_handler!`. Для оконных и других Tauri API используйте клиентские компоненты и не обращайтесь к `window` во время серверного рендеринга.

## 📦 Сборка приложения

```bash
npm run tauri:build
```

Сборка Next.js формирует статические файлы в `out/`, после чего Tauri создаёт приложение и доступные для текущей ОС установщики в `src-tauri/target/release/bundle/`:

| Платформа | Типичные артефакты |
| --- | --- |
| Windows | `.exe` (NSIS) в `nsis/`, `.msi` в `msi/` |
| macOS | `.dmg` в `dmg/` |
| Linux | `.AppImage` и/или `.deb` в каталогах `appimage/` и `deb/` |

Набор форматов зависит от ОС и установленных системных инструментов. Локальная команда собирает артефакты для текущей платформы; для остальных платформ используйте подходящие runner'ы GitHub Actions.

### 🤖 CI/CD и GitHub Actions

Workflow `.github/workflows/release.yml` запускается при push тега формата `v*` — например, `v1.0.0`. Он собирает приложение на Windows, macOS и Linux и прикрепляет артефакты к **черновику релиза GitHub**. Проверьте черновик и опубликуйте его в Releases.

Чтобы выпустить новую версию, обновите версию приложения при необходимости и отправьте тег:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## 📁 Структура проекта

| Путь | Назначение |
| --- | --- |
| `src/app/` | Next.js App Router: страницы, layout и глобальные стили |
| `src/components/` | Компоненты интерфейса, темы и управления окном |
| `src/components/ui/` | Базовые UI-компоненты в стиле shadcn/ui |
| `src/lib/tauri.ts` | Типизированные вызовы Rust-команд и проверка окружения Tauri |
| `src-tauri/src/` | Нативное приложение на Rust и команды для фронтенда |
| `src-tauri/capabilities/` | Разрешения Tauri v2 для окон и плагинов |
| `src-tauri/tauri.conf.json` | Конфигурация окна, сборки и ресурсов приложения |
| `.github/workflows/` | Автоматическая сборка мультиплатформенных релизов |
| `public/` | Статические ресурсы фронтенда |
| `out/` | Экспорт Next.js для Tauri; генерируется во время сборки |

## 🚑 Решение проблем

| Симптом | Что проверить |
| --- | --- |
| Ошибка Rust или Cargo | Убедитесь, что установлен Rust 1.90+, команда `rustc --version` доступна в новом терминале и системные зависимости установлены. После изменения PATH перезапустите VS Code. |
| Ошибка компиляции WebView/GTK на Linux | Установите системные пакеты для своего дистрибутива из [руководства Tauri](https://tauri.app/start/prerequisites/) и повторите сборку. |
| Пустой экран в собранном приложении | Проверьте успешность `npm run build`, наличие `out/index.html` и соответствие `frontendDist: "../out"` в конфигурации Tauri. Посмотрите ошибки приложения в DevTools. |
| `window is not defined` или ошибка SSR | Next.js настроен на статический экспорт (`output: "export"`). Не используйте браузерные и Tauri API на верхнем уровне модуля или в серверном компоненте: перенесите вызов в компонент с `"use client"` и `useEffect`, предварительно проверяя среду через `isTauri()`. |
| Ошибки гидратации при переключении темы | Используйте `suppressHydrationWarning` на `<html>` и отображайте зависящий от темы контент после монтирования клиента. |
| Не работает вызов `invoke` | Проверьте точное имя команды, регистрацию в `generate_handler!`, разрешения Tauri и соответствие аргументов Rust-команды объекту аргументов TypeScript. |

> Примечание: статический экспорт не запускает Next.js-сервер внутри приложения. Серверные возможности Next.js, которым нужен runtime-сервер, требуют отдельной архитектуры; используйте Rust-команды Tauri или внешний API для нативной логики и динамических данных.

## ⭐ Поддержать проект

Если шаблон помог вам начать быстрее, поставьте ⭐ репозиторию и поделитесь им с другими разработчиками. Pull request'ы и идеи по улучшению приветствуются!
