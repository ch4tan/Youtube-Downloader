use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

#[tauri::command]
async fn mettre_a_jour_moteur(app: AppHandle) -> Result<String, String> {
    let sidecar_command = app
        .shell()
        .sidecar("yt-dlp") 
        .map_err(|e| format!("Erreur : {}", e))?
        .args(["-U"]);

    let output = sidecar_command
        .output()
        .await
        .map_err(|e| format!("Échec de l'exécution de la mise à jour : {}", e))?;

    if output.status.success() {
        Ok("Le moteur yt-dlp a été mis à jour avec succès !".to_string())
    }
    else {
        let error_msg = String::from_utf8_lossy(&output.stderr);
        Err(format!("Erreur lors de la mise à jour : {}", error_msg))
    }
}

#[tauri::command]
async fn telecharger_video(app: AppHandle, url_input: String) -> Result<String, String> {
    let sidecar_command = app
        .shell()
        .sidecar("yt-dlp")
        .map_err(|e| format!("Erreur : {}", e))?
        .args([
            "-f", "bestvideo+bestaudio/best",
            "--merge-output-format", "mp4",
            "--remux-video", "mp4",
            "--recode-video", "mp4",
            "--audio-format", "aac",
            "--concurrent-fragments", "5",
            &url_input,
        ]);

    let output = sidecar_command
        .output()
        .await
        .map_err(|e| format!("Échec du téléchargement : {}", e))?;

    if output.status.success() {
        Ok("Vidéo téléchargée et assemblée avec succès dans votre dossier !".to_string())
    }
    else {
        let error_msg = String::from_utf8_lossy(&output.stderr);
        Err(format!("Erreur yt-dlp : {}", error_msg))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            mettre_a_jour_moteur,
            telecharger_video
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}