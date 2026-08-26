### 📜 Disclaimer

This software was developed strictly for educational purposes to explore native process integration (Sidecars) within Tauri v2 and Rust/React interoperability. The user assumes full responsibility for the use of this tool and for complying with the terms of service of any video platform from which content is retrieved.

### 📥 YT Downloader Pro

A modern, ultra-lightweight, and high-performance desktop application designed to download high-quality videos (HD, 2K, 4K) with perfect audio extraction. This project was developed to solve a real-world need: enabling video editors to retrieve source files smoothly and securely. 

The application leverages the power of the open-source CLI tool yt-dlp through a sleek and polished graphical user interface, built on top of the next-generation **Tauri v2** framework. 

### 🛠️ Tech Stack & Architecture

* **Frontend**: React.js, Tailwind CSS, Vite.
* **System Backend**: Rust (Tauri v2).
* **IPC Communication**: Direct asynchronous exchanges via Tauri's native protocol (no local HTTP/Axum server required, ensuring maximum security and resource efficiency).
* **Media Engines**: yt-dlp and ffmpeg bundled as native **Sidecars**.

### Development Highlights:

* **Multi-threading**: Enabled segmented parallel downloads to maximize available network bandwidth.
* **Auto-Maintenance**: Background script that checks and updates the download engine automatically every time the app launches, bypassing dynamic platform restrictions.
* **Codec Optimization**: Automatic remuxing via FFmpeg to enforce a universally compatible .mp4 container with audio converted to AAC format (playable natively on any media player or editing software like CapCut or Premiere Pro).

### ⚙️ Development Prerequisites

To compile this project locally, ensure you have the following installed: 

1. **Node.js** (v18 or higher)
2. **Rust & Cargo** (v1.88 or higher)
3. Windows Build Tools (C++ Build Tools via the Visual Studio Installer)

### 📦 Binary Configuration & Installation (Sidecars)

For legal reasons and repository size constraints, third-party executable files are not included in this source code. You must add them manually before running the application. 

### 1. Download Official Tools

* Download **yt-dlp.exe** from the [official yt-dlp GitHub Releases](https://github.com/yt-dlp/yt-dlp/releases).
* Download **ffmpeg.exe** (Essentials version) from the certified [Gyan.dev FFmpeg builds](https://www.gyan.dev/ffmpeg/builds/).

### 2. File Placement & Renaming

Create a folder named binaries at the following path: src-tauri/binaries/. 

You must append your system architecture's *target-triple* to the file names (e.g., x86_64-pc-windows-msvc for 64-bit Windows). Your folder structure must exactly match the following: 

![alt text](image-3.png)



### 🚀 Application Commands

### Install Frontend Dependencies

```npm install```

### Run Development Environment (Live Reload)

```npm run tauri dev```

### Compile and Package Production Executable (.exe)

```npm run tauri build```

The final file will be located in: src-tauri/target/release/bundle/nsis/ 