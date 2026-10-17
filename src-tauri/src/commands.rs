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

#[tauri::command]
pub async fn long_task(seconds: u64) -> Result<String, String> {
    tokio::time::sleep(std::time::Duration::from_secs(seconds)).await;
    Ok(format!("Задача завершена за {} сек.", seconds))
}
