<p align="center">
  <img src="html/assets/logo.png" alt="Pablo Scripts" width="420">
</p>

<h1 align="center">Pablo Loading Screen</h1>

<p align="center">
  Interactive FiveM loading screen with music, news, team page and Discord integration.
</p>

<p align="center">
  <a href="https://fivem.net/"><img src="https://img.shields.io/badge/FiveM-Script-blue?style=for-the-badge&logo=fivem&logoColor=white" alt="FiveM"></a>
  <img src="https://img.shields.io/badge/Framework-ESX%20%7C%20QB%20%7C%20Standalone-success?style=for-the-badge" alt="Framework">
  <img src="https://img.shields.io/badge/Type-Loading%20Screen-red?style=for-the-badge" alt="Type">
  <img src="https://img.shields.io/badge/License-Open%20Source-lightgrey?style=for-the-badge" alt="License">
  <a href="https://discord.gg/xE8EDuG4YS"><img src="https://img.shields.io/badge/Discord-Pablo%20Scripts-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/lua-%232C2D72.svg?style=flat-square&logo=lua&logoColor=white" alt="Lua">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/NUI-UI-orange?style=flat-square" alt="NUI">
  <img src="https://img.shields.io/badge/ESX-Legacy-green?style=flat-square" alt="ESX">
  <img src="https://img.shields.io/badge/QBCore-Compatible-blueviolet?style=flat-square" alt="QBCore">
  <img src="https://img.shields.io/badge/Qbox-Compatible-9cf?style=flat-square" alt="Qbox">
  <img src="https://img.shields.io/badge/Free-Release-brightgreen?style=flat-square" alt="Free">
  <img src="https://img.shields.io/github/stars/pabloeskobars/pablo-loadingscreen?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/pabloeskobars/pablo-loadingscreen?style=flat-square" alt="Forks">
  <img src="https://img.shields.io/github/last-commit/pabloeskobars/pablo-loadingscreen?style=flat-square" alt="Last commit">
</p>

---

## Preview

<p align="center">
  <img src="screenshots/preview-about.png" alt="About page" width="100%">
</p>

| About | News | Team |
|:-----:|:----:|:----:|
| <img src="screenshots/preview-about.png" alt="About"> | <img src="screenshots/preview-news.png" alt="News"> | <img src="screenshots/preview-team.png" alt="Team"> |

---

## Features

- **About page** — short intro about your project
- **News page** — updates and announcements
- **Team page** — staff list with copyable Discord tags
- **Music player** — play / pause / next / prev, seek, volume, mute
- **Discord button** — invite link + online member count (widget)
- **Background** — static image or video
- **Easy config** — everything in one `config.js`
- **Local fonts** — works offline in FiveM

---

## Installation

1. Download / clone this resource into your server `resources` folder  
2. Rename the folder to `pablo-loadingscreen` (if needed)  
3. Add this to your `server.cfg`:

```cfg
ensure pablo-loadingscreen
```

4. Edit `html/js/config.js`  
5. Restart your server  

> Make sure no other loading screen resource is started at the same time.

---

## Configuration

All settings are in **`html/js/config.js`**.

| Option | Description |
|--------|-------------|
| `serverName` / `tagline` | Header brand text |
| `backgroundType` | `'image'` or `'video'` |
| `backgroundImage` / `backgroundVideo` | Paths under `html/` |
| `about` | About page title + text |
| `news` | News list (`date`, `title`, `text`) |
| `team` | Team list (`name`, `role`, `discordTag`, `avatar`) |
| `discord.inviteUrl` | Discord invite link |
| `discord.guildId` | Server ID for online count |
| `music.tracks` | Music list (`title`, `artist`, `file`) |
| `tips` | Loading tip rotation |

### Background

- Put your image in `html/assets/backgrounds/` and set `backgroundType: 'image'`
- Or use a `.mp4` and set `backgroundType: 'video'`

### Music

1. Drop `.mp3` / `.ogg` files into `html/assets/music/`
2. Add them to `Config.music.tracks`
3. Use **royalty-free** music only

### Discord online count

1. Discord → Server Settings → Widget → Enable  
2. Set an invite channel  
3. Put your Server ID into `discord.guildId`

---

## Resource Structure

```text
pablo-loadingscreen/
├── fxmanifest.lua
├── client.lua
├── README.md
├── screenshots/
└── html/
    ├── index.html
    ├── css/
    ├── js/
    │   ├── config.js
    │   └── app.js
    └── assets/
        ├── logo.png
        ├── backgrounds/
        ├── fonts/
        ├── music/
        └── team/
```

---

## Browser Preview

Open `html/index.html` in your browser to preview the UI without FiveM.  
A demo progress bar runs automatically.

---

## Support

- Discord: [Pablo Scripts](https://discord.gg/xE8EDuG4YS)
- GitHub Issues: use this repository

---

## Keywords

`fivem` `fivem-script` `fivem-scripts` `fivem-loading-screen` `loading-screen` `loadingscreen` `loadscreen` `gta5` `gta-v` `gtav` `gta` `cfx` `cfx-re` `citizenfx` `esx` `esx-legacy` `es_extended` `qbcore` `qb-core` `qbox` `ox` `standalone` `framework` `lua` `nui` `html` `css` `javascript` `js` `ui` `hud` `discord` `discord-integration` `music-player` `mp3` `video-background` `open-source` `free` `free-script` `free-release` `roleplay` `rp` `rp-server` `fivem-rp` `server` `resource` `custom` `modern` `interactive` `config` `pablo-scripts` `pablo`

---

<p align="center">
  Made by <b>Pablo Scripts</b>
</p>
