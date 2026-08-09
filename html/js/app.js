(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const state = {
    page: Config.ui?.defaultPage || 'about',
    trackIndex: 0,
    trackToken: 0,
    playing: false,
    progress: 0,
    lastVolume: Config.music?.defaultVolume ?? 0.35
  };

  const audio = $('#audio');
  const toastEl = $('#toast');
  let toastTimer = null;
  let tipTimer = null;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 1800);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast(`Copied: ${text}`);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast(`Copied: ${text}`);
    }
  }

  /* —— Background —— */
  function setupBackground() {
    const overlay = $('#bgOverlay');
    const opacity = Math.min(1, Math.max(0, Config.backgroundOverlay ?? 0.72));
    overlay.style.opacity = String(opacity);

    const img = $('#bgImage');
    const video = $('#bgVideo');

    if (Config.backgroundType === 'video' && Config.backgroundVideo) {
      video.src = Config.backgroundVideo;
      video.classList.remove('hidden');
      video.play().catch(() => {});
    } else if (Config.backgroundImage) {
      img.src = Config.backgroundImage;
      img.classList.remove('hidden');
      img.onerror = () => {
        img.classList.add('hidden');
      };
    }
  }

  /* —— Header / About / News / Team —— */
  function setupHeader() {
    $('#serverName').textContent = Config.serverName || 'Server';
    $('#tagline').textContent = Config.tagline || '';
    if (Config.ui?.showBrand === false) {
      $('#brand').classList.add('hidden');
    }

    const btn = $('#discordBtn');
    const invite = Config.discord?.inviteUrl || '#';
    btn.href = invite;
    $('#discordLabel').textContent = Config.discord?.label || 'Join Discord';

    btn.addEventListener('click', (e) => {
      if (!invite || invite === '#' || invite.includes('your-invite')) {
        e.preventDefault();
        toast('Set discord.inviteUrl in config.js');
        return;
      }

      // FiveM loadscreen CEF: open via native when available
      if (typeof window.invokeNative === 'function') {
        e.preventDefault();
        window.invokeNative('openUrl', invite);
      }
    });
  }

  function setupAbout() {
    $('#aboutTitle').textContent = Config.about?.title || 'About';
    const body = $('#aboutBody');
    body.innerHTML = '';
    (Config.about?.text || []).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      body.appendChild(p);
    });
  }

  function setupNews() {
    const list = $('#newsList');
    list.innerHTML = '';
    (Config.news || []).forEach((item, i) => {
      const el = document.createElement('article');
      el.className = 'news-item';
      el.style.animationDelay = `${i * 0.06}s`;
      el.innerHTML = `
        <p class="news-date">${escapeHtml(item.date || '')}</p>
        <h3>${escapeHtml(item.title || '')}</h3>
        <p>${escapeHtml(item.text || '')}</p>
      `;
      list.appendChild(el);
    });
  }

  function setupTeam() {
    const grid = $('#teamGrid');
    grid.innerHTML = '';
    (Config.team || []).forEach((member, i) => {
      const el = document.createElement('article');
      el.className = 'member';
      el.style.animationDelay = `${i * 0.06}s`;
      const tag = member.discordTag || '';
      el.innerHTML = `
        <div class="member-top">
          <img class="avatar" src="${escapeAttr(member.avatar || 'assets/team/placeholder.svg')}" alt="" />
          <div>
            <p class="member-name">${escapeHtml(member.name || '')}</p>
            <p class="member-role">${escapeHtml(member.role || '')}</p>
          </div>
        </div>
        <button type="button" class="tag-btn" data-tag="${escapeAttr(tag)}">@${escapeHtml(tag)}</button>
      `;
      grid.appendChild(el);
    });

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.tag-btn');
      if (!btn) return;
      copyText(btn.dataset.tag || '');
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
  }

  /* —— Navigation —— */
  function setPage(name) {
    state.page = name;
    $$('.nav-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.page === name);
    });
    $$('.page').forEach((page) => {
      const active = page.dataset.page === name;
      page.classList.toggle('active', active);
      if (active) page.scrollTop = 0;
    });
  }

  function setupNav() {
    $('#nav').addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      setPage(btn.dataset.page);
    });
    setPage(state.page);
  }

  /* —— Discord widget online count —— */
  async function setupDiscordOnline() {
    const guildId = Config.discord?.guildId;
    const pill = $('#onlinePill');
    if (!Config.discord?.showOnlineCount || !guildId) return;

    try {
      const res = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
      if (!res.ok) return;
      const data = await res.json();
      $('#onlineCount').textContent = String(data.presence_count ?? 0);
      pill.classList.remove('hidden');
    } catch {
      // Widget disabled or offline — ignore
    }
  }

  /* —— Music —— */
  function updateVolumeUi(vol) {
    const slider = $('#volumeSlider');
    slider.style.setProperty('--vol', String(vol));
    const high = $('#volIconHigh');
    const low = $('#volIconLow');
    const mute = $('#volIconMute');
    high.classList.add('hidden');
    low.classList.add('hidden');
    mute.classList.add('hidden');
    if (vol <= 0.001) mute.classList.remove('hidden');
    else if (vol < 0.45) low.classList.remove('hidden');
    else high.classList.remove('hidden');
  }

  function tracks() {
    return Config.music?.tracks || [];
  }

  function currentTrack() {
    return tracks()[state.trackIndex] || null;
  }

  function updateTrackUi() {
    const t = currentTrack();
    $('#trackTitle').textContent = t?.title || 'No track';
    $('#trackArtist').textContent = t?.artist || 'Add files in assets/music';
    $('#iconPlay').classList.toggle('hidden', state.playing);
    $('#iconPause').classList.toggle('hidden', !state.playing);
  }

  function loadTrack(index, autoplay = false, fromUser = true) {
    const list = tracks();
    if (!list.length) {
      updateTrackUi();
      return;
    }
    state.trackIndex = ((index % list.length) + list.length) % list.length;
    const t = currentTrack();
    const token = ++state.trackToken;

    audio.oncanplay = null;
    audio.src = t.file;
    audio.load();
    updateTrackUi();
    $('#seekFill').style.width = '0%';

    if (autoplay) {
      audio.oncanplay = () => {
        if (token !== state.trackToken) return;
        audio.oncanplay = null;
        playAudio(fromUser);
      };
    }
  }

  function playAudio(fromUser = false) {
    if (!tracks().length) {
      if (fromUser) toast('Add music files in config.js');
      return;
    }
    audio.play()
      .then(() => {
        state.playing = true;
        updateTrackUi();
      })
      .catch(() => {
        state.playing = false;
        updateTrackUi();
        // Autoplay is often blocked — only notify on user action
        if (fromUser) toast('Click play to start music');
      });
  }

  function pauseAudio() {
    audio.pause();
    state.playing = false;
    updateTrackUi();
  }

  function setupMusic() {
    const player = $('#player');
    if (Config.music?.enabled === false) {
      player.classList.add('hidden');
      return;
    }

    audio.volume = Config.music?.defaultVolume ?? 0.35;
    $('#volumeSlider').value = String(audio.volume);
    updateVolumeUi(audio.volume);

    $('#playBtn').addEventListener('click', () => {
      if (state.playing) pauseAudio();
      else playAudio(true);
    });
    $('#prevBtn').addEventListener('click', () => loadTrack(state.trackIndex - 1, true));
    $('#nextBtn').addEventListener('click', () => loadTrack(state.trackIndex + 1, true));
    $('#volumeSlider').addEventListener('input', (e) => {
      const vol = Number(e.target.value);
      audio.volume = vol;
      state.lastVolume = vol > 0 ? vol : state.lastVolume;
      updateVolumeUi(vol);
    });
    $('#muteBtn').addEventListener('click', () => {
      if (audio.volume > 0) {
        state.lastVolume = audio.volume || 0.35;
        audio.volume = 0;
        $('#volumeSlider').value = '0';
        updateVolumeUi(0);
      } else {
        const restore = state.lastVolume || 0.35;
        audio.volume = restore;
        $('#volumeSlider').value = String(restore);
        updateVolumeUi(restore);
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      $('#seekFill').style.width = `${pct}%`;
    });
    audio.addEventListener('ended', () => loadTrack(state.trackIndex + 1, true, false));
    audio.addEventListener('error', () => {
      state.playing = false;
      updateTrackUi();
    });

    const seekBar = $('#seekBar');
    const seekTo = (clientX) => {
      if (!audio.duration) return;
      const rect = seekBar.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      audio.currentTime = ratio * audio.duration;
      $('#seekFill').style.width = `${ratio * 100}%`;
    };
    seekBar.addEventListener('click', (e) => seekTo(e.clientX));
    seekBar.addEventListener('keydown', (e) => {
      if (!audio.duration) return;
      if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
      if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, audio.currentTime - 5);
    });

    loadTrack(0, Config.music?.autoplay === true, false);
  }

  /* —— Loading progress (FiveM handlers) —— */
  function setProgress(pct, label) {
    state.progress = Math.max(0, Math.min(100, pct));
    $('#loadFill').style.width = `${state.progress}%`;
    $('#loadPct').textContent = `${Math.floor(state.progress)}%`;
    if (label) $('#loadLabel').textContent = label;
  }

  function setupTips() {
    const tips = Config.tips || [];
    if (!tips.length) return;
    let i = 0;
    const tipEl = $('#tip');
    const show = () => {
      tipEl.textContent = tips[i % tips.length];
      i += 1;
    };
    show();
    tipTimer = setInterval(show, 5000);
  }

  function setupLoadHandlers() {
    const handlers = {
      loadProgress(data) {
        const value = typeof data === 'number' ? data : (data?.loadFraction ?? 0);
        setProgress(value * 100, 'Loading resources…');
      },
      onLogLine(data) {
        const msg = typeof data === 'string' ? data : (data?.message || data?.logLine);
        if (msg) $('#loadLabel').textContent = String(msg).slice(0, 80);
      },
      startDataFileEntries(data) {
        const count = data?.count;
        if (count != null) $('#loadLabel').textContent = `Loading ${count} assets…`;
      },
      performMapLoadFunction() {
        $('#loadLabel').textContent = 'Loading map…';
      },
      endDataFileEntries() {
        $('#loadLabel').textContent = 'Finishing up…';
      }
    };

    window.addEventListener('message', (e) => {
      const data = e.data || {};
      const eventName = data.eventName || data.event || data.action;
      if (eventName && handlers[eventName]) {
        handlers[eventName](data);
        return;
      }
      if (typeof data.loadFraction === 'number') {
        setProgress(data.loadFraction * 100);
      }
    });

    // Demo progress when opened in a normal browser (not FiveM)
    const isFiveM = typeof window.invokeNative === 'function' || typeof window.nuiHandoverData !== 'undefined';
    if (!isFiveM) {
      let demo = 0;
      const id = setInterval(() => {
        demo = Math.min(100, demo + Math.random() * 8);
        setProgress(demo, 'Preview mode…');
        if (demo >= 100) clearInterval(id);
      }, 400);
    }
  }

  /* —— Init —— */
  function init() {
    setupBackground();
    setupHeader();
    setupAbout();
    setupNews();
    setupTeam();
    setupNav();
    setupMusic();
    setupTips();
    setupLoadHandlers();
    setupDiscordOnline();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
