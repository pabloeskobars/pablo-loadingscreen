/* =========================================================
   Pablo Scripts — Loading Screen Config
   Edit this file to customize your loading screen.
   ========================================================= */

const Config = {
  /* Server identity */
  serverName: 'Pablo Scripts',
  tagline: 'FiveM scripts — ESX, QB & standalone',

  /* Background: 'image' | 'video' */
  backgroundType: 'image',
  backgroundImage: 'assets/backgrounds/bg.svg', // or bg.jpg / bg.png
  backgroundVideo: 'assets/backgrounds/bg.mp4',
  backgroundOverlay: 0.72, // 0–1 darkness over media

  /* About page */
  about: {
    title: "What's this?",
    text: [
      "Hey — I'm Pablo. I make FiveM scripts and drop them here.",
      'This loading screen is free. Change whatever you want, put it on your server, no stress.',
      'Need help or wanna grab more stuff? Hop in the Discord.'
    ]
  },

  /* Discord integration */
  discord: {
    inviteUrl: 'https://discord.gg/xE8EDuG4YS',
    guildId: '1430205851439992864',
    label: 'Discord',
    showOnlineCount: true
  },

  /* News / updates */
  news: [
    {
      date: '2026-08-09',
      title: 'Free loading screen is out',
      text: 'First free release. Music, news, team page, Discord stuff — all in one. Grab it from GitHub or Discord.'
    },
    {
      date: '2026-08-01',
      title: 'Pablo Scripts started',
      text: 'Just getting things going. More free and paid scripts soon. Keep an eye on Discord.'
    }
  ],

  /* Team members — discordTag is copyable */
  team: [
    {
      name: 'Pablo',
      role: 'Owner / Dev',
      discordTag: 'pablo.eco',
      avatar: 'assets/team/pablo.png'
    }
  ],

  /* Music player — place .mp3/.ogg files in html/assets/music/ */
  music: {
    enabled: true,
    autoplay: true,
    defaultVolume: 0.35, // 0–1
    tracks: [
      {
        title: 'So Far From Home',
        artist: 'Siamese Youth',
        file: 'assets/music/so-far-from-home.mp3'
      },
      {
        title: 'Over Glowing Bridges',
        artist: 'Synth Flood',
        file: 'assets/music/over-glowing-bridges.mp3'
      }
    ]
  },

  /* Loading bar labels (random tip while loading) */
  tips: [
    'You can skip tracks with the music buttons.',
    'Team page — click a Discord tag to copy it.',
    'News has the latest drops.',
    'Stuck? Ask in Discord.'
  ],

  /* UI */
  ui: {
    defaultPage: 'about', // about | news | team
    showBrand: true
  }
};
