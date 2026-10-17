mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_log::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::get_system_info,
            commands::long_task,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
