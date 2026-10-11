// Lauju Store – Barrierefreier App Store (F-Droid & Neo Store Client)
// Entwickelt von Laurin Schneider für 100% TalkBack- und Tastatur-Zugänglichkeit

const APP_VERSION = 'v1.0.1';
const STORE_PACKAGE = 'de.lauri.appstore';

// 1. Vorkonfigurierte Standard-Paketquellen
const DEFAULT_REPOSITORIES = [
  {
    id: 'lauju',
    name: '🌟 Laujus Barrierefreie Apps',
    url: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo',
    fingerprint: '6CB811B89526A24CE7D41FB3FB4045B9FD0541D2017F96127CA4C407D43FCF0F',
    enabled: true,
    official: true
  },
  {
    id: 'fdroid',
    name: '📦 F-Droid Official Repository',
    url: 'https://f-droid.org/repo',
    fingerprint: '',
    enabled: true,
    official: true
  },
  {
    id: 'izzy',
    name: '🚀 IzzyOnDroid Open Source Repo',
    url: 'https://apt.izzysoft.de/fdroid/repo',
    fingerprint: '',
    enabled: false,
    official: false
  }
];

// 2. Integrierter Offline-Katalog für garantierte Verfügbarkeit
const INITIAL_APPS = [
  {
    id: 'finanzapp',
    packageName: 'de.lauri.finanzapp',
    name: 'Haushaltsbuch Barrierefrei',
    summary: 'Barrierefreie Finanzverwaltung, Haushaltsbuch, Verträge, Budgets & Quittungs-Scanner',
    description: 'Das barrierefreie Haushaltsbuch wurde speziell für blinde und sehbehinderte Menschen entwickelt. Es bietet volle TalkBack-Unterstützung, einfache Buchungserfassung, Vertragsverwaltung, sichere Backups und Beleg-Verwaltung ohne Cloud-Zwang.',
    versionName: '6.9.8',
    versionCode: 20,
    size: '3.3 MB',
    author: 'Laurin Schneider',
    category: 'productivity',
    icon: '💰',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://github.com/Lauju1909/BarrierefreieFinanzApp-Android/releases/latest/download/app-release-unsigned.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreieFinanzApp-Android',
    changelog: 'v6.9.8: Neue Multiplattform-Synchronisation, automatisches Änderungsprotokoll & TalkBack-Verbesserungen.'
  },
  {
    id: 'stundenplan',
    packageName: 'de.lwl.stundenplan',
    name: 'Barrierefreies WebUntis',
    summary: 'Stundenplan & Vertretungsplan für Schüler am LWL-Berufskolleg Soest',
    description: 'Offizieller, 100% barrierefreier Stundenplan für blinde und sehbehinderte Schüler. Zeigt aktuelle Unterrichtsstunden, Raumänderungen, Vertretungen und den Mensa-Speiseplan mit optimierter Tastatur- und Screenreader-Bedienung.',
    versionName: '1.9.30',
    versionCode: 31,
    size: '3.1 MB',
    author: 'Laurin Schneider',
    category: 'education',
    icon: '📅',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://github.com/Lauju1909/BarrierefreierStundenplanLWL-Android/releases/latest/download/app-release-unsigned.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreierStundenplanLWL-Android',
    changelog: 'v1.9.30: Schnellauswahl für Tage, verbesserte Barrierefreiheit & automatisches Änderungsprotokoll.'
  },
  {
    id: 'vokabelstar',
    packageName: 'de.lauri.vokabelstar',
    name: 'VokabelStar Trainer',
    summary: 'Mobiler barrierefreier Vokabeltrainer mit Word/Excel-Import & Sprachausgabe',
    description: 'Lerne Fremdsprachen effektiv und barrierefrei auf deinem Smartphone. Unterstützt Word- und Excel-Dateien, Audio-Aussprache und verschiedene barrierefreie Abfragemodi.',
    versionName: '1.3.2',
    versionCode: 8,
    size: '3.5 MB',
    author: 'Laurin Schneider',
    category: 'education',
    icon: '⭐',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://github.com/Lauju1909/VokabelStar-Android/releases/latest/download/VokabelStar_v1.3.2.apk',
    sourceUrl: 'https://github.com/Lauju1909/VokabelStar-Android',
    changelog: 'v1.3.2: Android 14/15 Unterstützung, optimierte Audio-Engine & Fehlerbehebungen.'
  },
  {
    id: 'lernplatform',
    packageName: 'de.lauri.lernplatform',
    name: 'Lernplattform Android',
    summary: 'Mobiles barrierefreies Lernen, Wissensquiz & Übungsaufgaben',
    description: 'Die mobile Lernplattform bietet interaktive Übungen, Lernkarten und Tests in verschiedenen Fächern, optimiert für TalkBack und Großschrift.',
    versionName: '1.2.5',
    versionCode: 8,
    size: '3.5 MB',
    author: 'Laurin Schneider',
    category: 'education',
    icon: '🎓',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://github.com/Lauju1909/Lernplatform-Android/releases/latest/download/app-release-unsigned.apk',
    sourceUrl: 'https://github.com/Lauju1909/Lernplatform-Android',
    changelog: 'v1.2.5: Neue Quiz-Module, schnellere Ladezeiten & Fehlerbehebungen.'
  },
  {
    id: 'audiostudio',
    packageName: 'de.lauri.audiostudiotycoon',
    name: 'Audio Studio Tycoon',
    summary: 'Barrierefreie Spieleentwickler-Simulation komplett nach Gehör spielbar',
    description: 'Baue dein eigenes Gaming-Studio auf! Mit vollständiger Sprachausgabe, haptischem Feedback und spannenden Soundeffekten.',
    versionName: '1.1.0',
    versionCode: 4,
    size: '8.4 MB',
    author: 'Laurin Schneider',
    category: 'games',
    icon: '🎧',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/AudioStudioTycoon.apk',
    sourceUrl: 'https://github.com/Lauju1909/fdroid-repo',
    changelog: 'v1.1.0: Neue Spiele-Genres, verbesserte Sound-Synthese.'
  },
  {
    id: 'minigames',
    packageName: 'de.lauri.minigames',
    name: 'Audio Mini Games',
    summary: 'Über 60 barrierefreie Minispiele spielbar nach Gehör und Haptik',
    description: 'Eine bunte Sammlung barrierefreier Reaktions-, Denk- und Rhythmusspiele ohne visuelle Barrieren.',
    versionName: '2.0.1',
    versionCode: 12,
    size: '14.2 MB',
    author: 'Laurin Schneider',
    category: 'games',
    icon: '🕹️',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/MiniGameSammlung.apk',
    sourceUrl: 'https://github.com/Lauju1909/fdroid-repo',
    changelog: 'v2.0.1: Neue Minispiele hinzugefügt, Highscore-System erweitert.'
  },
  {
    id: 'translator',
    packageName: 'com.talkback.translator',
    name: 'TalkBack Deutsch-Übersetzer',
    summary: 'Liest fremdsprachige Android-Apps live auf Deutsch für Screenreader vor',
    description: 'Ein mächtiges Barrierefreiheits-Tool: Übersetzt englische Bildschirminhalte live und gibt sie über die TalkBack-Sprachausgabe wieder.',
    versionName: '1.0.4',
    versionCode: 5,
    size: '5.1 MB',
    author: 'Laurin Schneider',
    category: 'accessibility',
    icon: '🗣️',
    license: 'GPL-3.0',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/TalkBackTranslator.apk',
    sourceUrl: 'https://github.com/Lauju1909/fdroid-repo',
    changelog: 'v1.0.4: Schnelleres OCR, flüssigere Sprachausgabe.'
  },
  {
    id: 'appstore',
    packageName: 'de.lauri.appstore',
    name: 'Lauju Store',
    summary: 'Dieser barrierefreie Open-Source App Store (F-Droid & Neo Store Client)',
    description: 'Der moderne, barrierefreie Store für alle deine Android-Anwendungen. Unterstützt F-Droid Repositories, automatische Update-Prüfung, TalkBack-Optimierung und Google Play Protect Konformität.',
    versionName: '1.0.0',
    versionCode: 1,
    size: '3.8 MB',
    author: 'Laurin Schneider',
    category: 'tools',
    icon: '🏪',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://github.com/Lauju1909/BarrierefreierAppStore-Android/releases/latest/download/app-release-unsigned.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreierAppStore-Android',
    changelog: 'v1.0.0: Erste Veröffentlichung des modernen barrierefreien App Stores.'
  },
  {
    id: 'newpipe',
    packageName: 'org.schabi.newpipe',
    name: 'NewPipe',
    summary: 'Leichtgewichtiger, werbefreier Medien-Player für Streaming',
    description: 'Beliebter Open-Source Medien-Client ohne Google Play Dienste, mit Hintergrundwiedergabe und Download-Funktion.',
    versionName: '0.27.2',
    versionCode: 994,
    size: '11.5 MB',
    author: 'NewPipe Team',
    category: 'tools',
    icon: '📺',
    license: 'GPL-3.0',
    repoId: 'fdroid',
    apkUrl: 'https://f-droid.org/repo/org.schabi.newpipe_994.apk',
    sourceUrl: 'https://github.com/TeamNewPipe/NewPipe',
    changelog: 'Neueste Fehlerbehebungen für Video-Streaming.'
  },
  {
    id: 'vlc',
    packageName: 'org.videolan.vlc',
    name: 'VLC for Android',
    summary: 'Der bekannte, universelle Audio- und Video-Player',
    description: 'Spielt alle Video- und Audioformate, Netzwerk-Streams und Medien ab. Hohe Zugänglichkeit und umfassende Equalizer-Optionen.',
    versionName: '3.5.4',
    versionCode: 3050407,
    size: '34.8 MB',
    author: 'VideoLAN',
    category: 'tools',
    icon: '🎬',
    license: 'GPL-2.0',
    repoId: 'fdroid',
    apkUrl: 'https://f-droid.org/repo/org.videolan.vlc_3050407.apk',
    sourceUrl: 'https://code.videolan.org/videolan/vlc-android',
    changelog: 'Verbesserte Audio-Decodierung und Untertitel-Support.'
  }
];

// 3. Zustand der App
let state = {
  currentTab: 'explore',
  searchQuery: '',
  currentCategory: 'all',
  currentSort: 'featured',
  repositories: [],
  apps: [],
  installedApps: {}, // packageName -> { versionName, versionCode, installedAt }
  selectedApp: null
};

// 4. Barrierefreie Screenreader-Ansage
function announceSR(text) {
  const el = document.getElementById('sr-announcer');
  if (el) {
    el.textContent = '';
    setTimeout(() => { el.textContent = text; }, 50);
  }
}

// 5. Kurzer Bestätigungston (Web Audio API)
function playAudioCue() {
  const enabled = document.getElementById('setting-audio-cue')?.checked ?? true;
  if (!enabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

// 6. Initialisierung & Speicher laden
function loadSettingsAndState() {
  // Repositories laden
  const savedRepos = localStorage.getItem('lauju_store_repos');
  if (savedRepos) {
    try { state.repositories = JSON.parse(savedRepos); } catch(e) { state.repositories = DEFAULT_REPOSITORIES; }
  } else {
    state.repositories = DEFAULT_REPOSITORIES;
    localStorage.setItem('lauju_store_repos', JSON.stringify(DEFAULT_REPOSITORIES));
  }

  // Installierte Apps laden
  const savedInstalled = localStorage.getItem('lauju_store_installed');
  if (savedInstalled) {
    try { state.installedApps = JSON.parse(savedInstalled); } catch(e) { state.installedApps = {}; }
  } else {
    // Standardmäßig Store selbst als installiert markieren
    state.installedApps = {
      [STORE_PACKAGE]: { versionName: APP_VERSION.replace('v', ''), versionCode: 1, installedAt: Date.now() }
    };
    saveInstalledApps();
  }

  // Gespeicherte Apps laden oder Initialkatalog nehmen
  const savedCatalog = localStorage.getItem('lauju_store_catalog');
  if (savedCatalog) {
    try { state.apps = JSON.parse(savedCatalog); } catch(e) { state.apps = INITIAL_APPS; }
  } else {
    state.apps = INITIAL_APPS;
  }

  // Theme anwenden
  const savedTheme = localStorage.getItem('lauju_store_theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  const themeSelect = document.getElementById('setting-theme');
  if (themeSelect) themeSelect.value = savedTheme;

  document.getElementById('store-version-display').textContent = APP_VERSION;
}

function saveInstalledApps() {
  localStorage.setItem('lauju_store_installed', JSON.stringify(state.installedApps));
  updateBadgesAndLists();
}

function saveRepositories() {
  localStorage.setItem('lauju_store_repos', JSON.stringify(state.repositories));
  renderRepositoriesList();
}

// 7. Navigation Tab umschalten
function switchTab(tabId) {
  state.currentTab = tabId;
  
  // Tabs umschalten
  document.querySelectorAll('.tab-view').forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });
  
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.style.display = 'block';
    targetView.classList.add('active');
  }

  // Bottom Nav Buttons aktualisieren
  document.querySelectorAll('.nav-item').forEach(btn => {
    const isActive = btn.id === `nav-${tabId}`;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive.toString());
  });

  // Suchleiste & Filterleiste anpassen
  const searchContainer = document.getElementById('search-container');
  const chipsBar = document.getElementById('category-chips-bar');
  if (tabId === 'explore') {
    searchContainer.style.display = 'block';
    chipsBar.style.display = 'flex';
  } else if (tabId === 'installed') {
    searchContainer.style.display = 'block';
    chipsBar.style.display = 'none';
  } else {
    searchContainer.style.display = 'none';
    chipsBar.style.display = 'none';
  }

  // Listen neu rendern
  if (tabId === 'explore') renderExploreList();
  if (tabId === 'installed') renderInstalledList();
  if (tabId === 'updates') renderUpdatesList();
  if (tabId === 'settings') renderRepositoriesList();

  announceSR(`Bereich ${getTabTitle(tabId)} geöffnet.`);
}

function getTabTitle(tabId) {
  switch(tabId) {
    case 'explore': return 'Entdecken';
    case 'installed': return 'Installierte Apps';
    case 'updates': return 'Updates';
    case 'settings': return 'Einstellungen';
    default: return '';
  }
}

// 8. Filterung & Sortierung der Apps
function getFilteredApps(appsPool) {
  return appsPool.filter(app => {
    // Repositories-Filter (Quelle muss aktiv sein)
    const repo = state.repositories.find(r => r.id === app.repoId);
    if (repo && !repo.enabled) return false;

    // Kategorie-Filter
    if (state.currentCategory !== 'all' && app.category !== state.currentCategory) {
      return false;
    }

    // Suchfilter
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = app.name.toLowerCase().includes(q);
      const matchSummary = app.summary.toLowerCase().includes(q);
      const matchPkg = app.packageName.toLowerCase().includes(q);
      if (!matchName && !matchSummary && !matchPkg) return false;
    }

    return true;
  }).sort((a, b) => {
    if (state.currentSort === 'name') {
      return a.name.localeCompare(b.name, 'de');
    } else if (state.currentSort === 'updated') {
      return (b.versionCode || 0) - (a.versionCode || 0);
    }
    return 0; // featured
  });
}

// 9. Apps im "Entdecken"-Tab rendern
function renderExploreList() {
  const container = document.getElementById('explore-apps-list');
  const countBadge = document.getElementById('app-count-badge');
  const filtered = getFilteredApps(state.apps);

  countBadge.textContent = `${filtered.length}`;
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-placeholder" style="grid-column: 1/-1;">
        <span class="placeholder-icon">🔍</span>
        <h3>Keine Apps gefunden</h3>
        <p>Versuche einen anderen Suchbegriff oder passe den Kategorie-Filter an.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(app => {
    const isInstalled = !!state.installedApps[app.packageName];
    const card = document.createElement('article');
    card.className = 'app-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${app.name}, Version ${app.versionName}. ${isInstalled ? 'Bereits installiert.' : 'Nicht installiert.'}`);

    card.innerHTML = `
      <div class="app-card-icon" aria-hidden="true">${app.icon || '📦'}</div>
      <div class="app-card-info">
        <h3 class="app-card-title">${app.name}</h3>
        <p class="app-card-desc">${app.summary}</p>
        <div class="app-card-meta">
          <span class="app-card-version">v${app.versionName}</span>
          <span>•</span>
          <span>${app.size}</span>
          <span>•</span>
          <span>${getRepoBadge(app.repoId)}</span>
        </div>
      </div>
      <div class="app-card-action">
        <button class="btn ${isInstalled ? 'outline' : 'primary'}" aria-label="${isInstalled ? app.name + ' öffnen' : app.name + ' installieren'}">
          ${isInstalled ? 'Öffnen' : 'Laden'}
        </button>
      </div>
    `;

    card.addEventListener('click', () => openAppDetails(app));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAppDetails(app);
      }
    });

    container.appendChild(card);
  });
}

function getRepoBadge(repoId) {
  if (repoId === 'lauju') return '🌟 Lauju';
  if (repoId === 'fdroid') return '📦 F-Droid';
  if (repoId === 'izzy') return '🚀 Izzy';
  return 'Quelloffen';
}

// 10. Installierte Apps rendern
function renderInstalledList() {
  const container = document.getElementById('installed-apps-list');
  const countBadge = document.getElementById('installed-count-badge');
  const placeholder = document.getElementById('no-installed-placeholder');

  const installedKeys = Object.keys(state.installedApps);
  countBadge.textContent = `${installedKeys.length}`;
  container.innerHTML = '';

  if (installedKeys.length === 0) {
    placeholder.style.display = 'block';
    return;
  }
  placeholder.style.display = 'none';

  installedKeys.forEach(pkg => {
    const appInfo = state.apps.find(a => a.packageName === pkg) || {
      name: pkg,
      packageName: pkg,
      icon: '📱',
      summary: 'Auf diesem Gerät installiert',
      versionName: state.installedApps[pkg].versionName || '1.0.0',
      size: 'Installiert',
      repoId: 'lokal'
    };

    const card = document.createElement('article');
    card.className = 'app-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${appInfo.name}, installierte Version ${state.installedApps[pkg].versionName}`);

    card.innerHTML = `
      <div class="app-card-icon" aria-hidden="true">${appInfo.icon || '📱'}</div>
      <div class="app-card-info">
        <h3 class="app-card-title">${appInfo.name}</h3>
        <p class="app-card-desc">${appInfo.summary}</p>
        <div class="app-card-meta">
          <span class="app-card-version">v${state.installedApps[pkg].versionName}</span>
          <span>•</span>
          <span style="color: var(--md-sys-color-success);">✅ Installiert</span>
        </div>
      </div>
      <div class="app-card-action">
        <button class="btn primary" aria-label="${appInfo.name} starten">Öffnen</button>
      </div>
    `;

    card.addEventListener('click', () => openAppDetails(appInfo));
    container.appendChild(card);
  });
}

// 11. Updates ermitteln & rendern
function getAvailableUpdates() {
  const updates = [];
  Object.keys(state.installedApps).forEach(pkg => {
    const installed = state.installedApps[pkg];
    const available = state.apps.find(a => a.packageName === pkg);
    if (available) {
      const codeNew = available.versionCode || 0;
      const codeInst = installed.versionCode || 0;
      if (codeNew > codeInst || available.versionName !== installed.versionName) {
        updates.push({ app: available, installedVersion: installed.versionName });
      }
    }
  });
  return updates;
}

function renderUpdatesList() {
  const container = document.getElementById('updates-apps-list');
  const countBadge = document.getElementById('updates-count-badge');
  const btnUpdateAll = document.getElementById('btn-update-all');
  const placeholder = document.getElementById('no-updates-placeholder');

  const updates = getAvailableUpdates();
  countBadge.textContent = `${updates.length}`;

  if (updates.length === 0) {
    container.innerHTML = '';
    placeholder.style.display = 'block';
    btnUpdateAll.style.display = 'none';
    return;
  }

  placeholder.style.display = 'none';
  btnUpdateAll.style.display = 'inline-flex';
  btnUpdateAll.textContent = `⚡ Alle ${updates.length} aktualisieren`;
  container.innerHTML = '';

  updates.forEach(item => {
    const { app, installedVersion } = item;
    const card = document.createElement('article');
    card.className = 'app-card';
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="app-card-icon" aria-hidden="true">${app.icon || '🔄'}</div>
      <div class="app-card-info">
        <h3 class="app-card-title">${app.name}</h3>
        <p class="app-card-desc" style="color: var(--md-sys-color-primary); font-weight: 600;">
          Update: v${installedVersion} ➔ v${app.versionName}
        </p>
        <div class="app-card-meta">
          <span>${app.size}</span>
          <span>•</span>
          <span>${app.changelog || 'Neue Verbesserungen'}</span>
        </div>
      </div>
      <div class="app-card-action">
        <button class="btn primary btn-update-single" aria-label="${app.name} auf Version ${app.versionName} aktualisieren">
          Aktualisieren
        </button>
      </div>
    `;

    card.querySelector('.btn-update-single').addEventListener('click', (e) => {
      e.stopPropagation();
      startAppInstall(app);
    });

    card.addEventListener('click', () => openAppDetails(app));
    container.appendChild(card);
  });
}

function updateBadgesAndLists() {
  const updates = getAvailableUpdates();
  const navBadge = document.getElementById('nav-updates-badge');
  const countBadge = document.getElementById('updates-count-badge');
  
  if (navBadge) {
    if (updates.length > 0) {
      navBadge.style.display = 'block';
      navBadge.textContent = `${updates.length}`;
    } else {
      navBadge.style.display = 'none';
    }
  }
  if (countBadge) countBadge.textContent = `${updates.length}`;

  const installedKeys = Object.keys(state.installedApps);
  const installedBadge = document.getElementById('installed-count-badge');
  if (installedBadge) installedBadge.textContent = `${installedKeys.length}`;
}

// 12. App-Detailansicht Modal öffnen
function openAppDetails(app) {
  state.selectedApp = app;
  const isInstalled = !!state.installedApps[app.packageName];
  const updates = getAvailableUpdates();
  const hasUpdate = updates.some(u => u.app.packageName === app.packageName);

  document.getElementById('modal-app-icon').textContent = app.icon || '📦';
  document.getElementById('modal-app-title').textContent = app.name;
  document.getElementById('modal-app-author').textContent = `Von: ${app.author || 'Open Source Entwickler'}`;
  document.getElementById('modal-app-version').textContent = `v${app.versionName}`;
  document.getElementById('modal-app-size').textContent = app.size || '3.5 MB';
  document.getElementById('modal-app-repo').textContent = getRepoBadge(app.repoId);
  document.getElementById('modal-app-description').textContent = app.description || app.summary;
  document.getElementById('modal-app-changelog').textContent = app.changelog || 'Fehlerbehebungen und Leistungsoptimierungen.';
  document.getElementById('modal-app-package').textContent = app.packageName;
  document.getElementById('modal-app-license').textContent = app.license || 'MIT / Open Source';
  document.getElementById('modal-link-source').href = app.sourceUrl || 'https://github.com/Lauju1909';

  const actionBtn = document.getElementById('modal-btn-action');
  const uninstallBtn = document.getElementById('modal-btn-uninstall');

  if (hasUpdate) {
    actionBtn.textContent = '🔄 Auf v' + app.versionName + ' aktualisieren';
    actionBtn.className = 'btn primary btn-large';
    uninstallBtn.style.display = 'inline-flex';
  } else if (isInstalled) {
    actionBtn.textContent = '▶️ App öffnen';
    actionBtn.className = 'btn outline btn-large';
    uninstallBtn.style.display = 'inline-flex';
  } else {
    actionBtn.textContent = '📥 Installieren (' + app.size + ')';
    actionBtn.className = 'btn primary btn-large';
    uninstallBtn.style.display = 'none';
  }

  // Fortschrittsbalken zurücksetzen
  document.getElementById('modal-download-progress').style.display = 'none';
  document.getElementById('modal-progress-fill').style.width = '0%';

  const modal = document.getElementById('app-detail-modal');
  modal.style.display = 'flex';
  announceSR(`App-Details für ${app.name} geöffnet.`);
}

function closeAppDetails() {
  document.getElementById('app-detail-modal').style.display = 'none';
  state.selectedApp = null;
}

// 13. Download & Installation (nativ im Hintergrund)
function getNativeInstaller() {
  return window.Capacitor?.Plugins?.StoreInstaller || null;
}

async function ensureInstallPermission() {
  const native = getNativeInstaller();
  if (!native) return true;
  const { value } = await native.canRequestPackageInstalls();
  if (value) return true;
  announceSR('Bitte erlaube dem Lauju Store, Apps zu installieren. Die Einstellungen öffnen sich jetzt.');
  await native.openInstallPermissionSettings();
  return false;
}

async function syncInstalledFromDevice() {
  const native = getNativeInstaller();
  if (!native) return;
  try {
    const { apps } = await native.getInstalledApps();
    const known = new Set(state.apps.map(a => a.packageName));
    const installed = {};
    apps.forEach(p => {
      if (known.has(p.packageName)) {
        installed[p.packageName] = {
          versionName: p.versionName,
          versionCode: p.versionCode,
          installedAt: Date.now()
        };
      }
    });
    state.installedApps = installed;
    saveInstalledApps();
  } catch (e) {
    console.warn('Installierte Apps konnten nicht gelesen werden', e);
  }
}

// Installiert ohne UI (für automatische Updates)
async function installAppSilently(app) {
  const native = getNativeInstaller();
  if (!native) {
    window.open(app.apkUrl, '_blank');
    return;
  }
  if (!(await ensureInstallPermission())) return;
  try {
    await native.downloadAndInstall({ url: app.apkUrl, fileName: `${app.packageName}_${app.versionCode}.apk` });
    playAudioCue();
    announceSR(`${app.name} wurde auf Version ${app.versionName} aktualisiert.`);
  } catch (e) {
    announceSR(`Installation von ${app.name} fehlgeschlagen.`);
    console.warn(e);
  }
}

async function startAppInstall(app) {
  if (!app) return;
  const progressBox = document.getElementById('modal-download-progress');
  const progressFill = document.getElementById('modal-progress-fill');
  const progressLabel = document.getElementById('modal-progress-label');
  const actionBtn = document.getElementById('modal-btn-action');

  const native = getNativeInstaller();

  // Web-Fallback (Browser): normaler Download
  if (!native) {
    window.open(app.apkUrl, '_blank');
    announceSR(`Download von ${app.name} gestartet.`);
    return;
  }

  if (!(await ensureInstallPermission())) return;

  progressBox.style.display = 'block';
  progressFill.style.width = '40%';
  progressLabel.textContent = 'Lade APK im Hintergrund herunter...';
  actionBtn.disabled = true;
  announceSR(`Download von ${app.name} gestartet...`);

  try {
    await native.downloadAndInstall({ url: app.apkUrl, fileName: `${app.packageName}_${app.versionCode}.apk` });
    progressFill.style.width = '100%';
    progressLabel.textContent = 'Installation läuft...';
    playAudioCue();
    announceSR(`${app.name} heruntergeladen. Installation wird ausgeführt.`);
  } catch (e) {
    progressLabel.textContent = 'Fehler beim Herunterladen.';
    announceSR(`Installation von ${app.name} fehlgeschlagen.`);
  }

  setTimeout(async () => {
    actionBtn.disabled = false;
    await syncInstalledFromDevice();
    if (state.selectedApp) openAppDetails(app);
    if (state.currentTab === 'explore') renderExploreList();
    if (state.currentTab === 'updates') renderUpdatesList();
    if (state.currentTab === 'installed') renderInstalledList();
  }, 4000);
}

// 14. Repositories rendern & synchronisieren
function renderRepositoriesList() {
  const container = document.getElementById('repo-list');
  container.innerHTML = '';

  state.repositories.forEach((repo, idx) => {
    const card = document.createElement('div');
    card.className = 'repo-card';

    card.innerHTML = `
      <div class="repo-info">
        <span class="repo-title">${repo.name}</span>
        <span class="repo-url">${repo.url}</span>
      </div>
      <label class="toggle-switch" aria-label="${repo.name} aktivieren oder deaktivieren">
        <input type="checkbox" ${repo.enabled ? 'checked' : ''} data-repo-idx="${idx}">
        <span class="toggle-slider"></span>
      </label>
    `;

    card.querySelector('input').addEventListener('change', (e) => {
      state.repositories[idx].enabled = e.target.checked;
      saveRepositories();
      announceSR(`${repo.name} ${e.target.checked ? 'aktiviert' : 'deaktiviert'}.`);
    });

    container.appendChild(card);
  });
}

async function syncAllRepositories(silent = false) {
  if (!silent) announceSR('Synchronisiere alle aktiven Paketquellen...');
  const syncBtn = document.getElementById('btn-sync-all');
  if (syncBtn) syncBtn.classList.add('pulsing');

  let changed = false;
  for (const repo of state.repositories.filter(r => r.enabled)) {
    try {
      const base = repo.url.replace(/\/+$/, '');
      const res = await fetch(`${base}/index-v1.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      const pkgs = data.packages || {};

      (data.apps || []).forEach(meta => {
        const versions = pkgs[meta.packageName];
        if (!versions || versions.length === 0) return;
        const latest = versions.reduce((a, b) => (b.versionCode > a.versionCode ? b : a));
        const apkUrl = `${base}/${latest.apkName}`;
        const sizeMb = latest.size ? `${(latest.size / 1048576).toFixed(1)} MB` : '';

        const existing = state.apps.find(a => a.packageName === meta.packageName);
        if (existing) {
          if (latest.versionCode >= (existing.versionCode || 0)) {
            if (existing.versionCode !== latest.versionCode) changed = true;
            existing.versionName = latest.versionName;
            existing.versionCode = latest.versionCode;
            existing.apkUrl = apkUrl;
            if (sizeMb) existing.size = sizeMb;
            existing.repoId = repo.id;
          }
        } else {
          state.apps.push({
            id: meta.packageName,
            packageName: meta.packageName,
            name: meta.name || meta.packageName,
            summary: meta.summary || '',
            description: meta.description || meta.summary || '',
            versionName: latest.versionName,
            versionCode: latest.versionCode,
            size: sizeMb || '? MB',
            author: meta.authorName || 'Unbekannt',
            category: 'tools',
            icon: '📦',
            license: meta.license || 'Open Source',
            repoId: repo.id,
            apkUrl,
            sourceUrl: meta.sourceCode || '',
            changelog: `v${latest.versionName}`
          });
          changed = true;
        }
      });
    } catch (e) {
      console.warn('Sync fehlgeschlagen für', repo.url, e);
    }
  }

  localStorage.setItem('lauju_store_catalog', JSON.stringify(state.apps));
  await syncInstalledFromDevice();

  if (syncBtn) syncBtn.classList.remove('pulsing');
  if (!silent) {
    playAudioCue();
    announceSR('Alle Paketquellen synchronisiert. Katalog ist aktuell.');
  }
  updateBadgesAndLists();
  renderExploreList();
  if (state.currentTab === 'updates') renderUpdatesList();
  return changed;
}

// 15. Event Listener Registrierung
function setupEventListeners() {
  // Navigation Tabs
  document.getElementById('nav-explore').addEventListener('click', () => switchTab('explore'));
  document.getElementById('nav-installed').addEventListener('click', () => switchTab('installed'));
  document.getElementById('nav-updates').addEventListener('click', () => switchTab('updates'));
  document.getElementById('nav-settings').addEventListener('click', () => switchTab('settings'));

  // Go to Explore from Empty Installed
  const btnGotoExplore = document.getElementById('btn-goto-explore');
  if (btnGotoExplore) btnGotoExplore.addEventListener('click', () => switchTab('explore'));

  // Sync Button
  document.getElementById('btn-sync-all').addEventListener('click', () => syncAllRepositories(false));

  // Suche
  const searchInput = document.getElementById('app-search-input');
  const clearBtn = document.getElementById('btn-clear-search');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearBtn.style.display = state.searchQuery ? 'block' : 'none';
    if (state.currentTab === 'explore') renderExploreList();
    if (state.currentTab === 'installed') renderInstalledList();
  });
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    if (state.currentTab === 'explore') renderExploreList();
    if (state.currentTab === 'installed') renderInstalledList();
  });

  // Kategorie Chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      state.currentCategory = chip.getAttribute('data-cat');
      renderExploreList();
      announceSR(`Filter: ${chip.textContent}`);
    });
  });

  // Sortierung
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    renderExploreList();
  });

  // Modal Schließen
  document.getElementById('btn-close-modal').addEventListener('click', closeAppDetails);
  document.getElementById('app-detail-modal').addEventListener('click', (e) => {
    if (e.target.id === 'app-detail-modal') closeAppDetails();
  });

  // Modal Aktionen
  document.getElementById('modal-btn-action').addEventListener('click', () => {
    if (state.selectedApp) {
      const isInstalled = !!state.installedApps[state.selectedApp.packageName];
      const updates = getAvailableUpdates();
      const hasUpdate = updates.some(u => u.app.packageName === state.selectedApp.packageName);
      if (hasUpdate || !isInstalled) {
        startAppInstall(state.selectedApp);
      } else {
        announceSR(`${state.selectedApp.name} wird geöffnet.`);
      }
    }
  });

  document.getElementById('modal-btn-uninstall').addEventListener('click', () => {
    if (state.selectedApp && state.installedApps[state.selectedApp.packageName]) {
      const name = state.selectedApp.name;
      delete state.installedApps[state.selectedApp.packageName];
      saveInstalledApps();
      closeAppDetails();
      announceSR(`${name} wurde deinstalliert.`);
      if (state.currentTab === 'installed') renderInstalledList();
      if (state.currentTab === 'updates') renderUpdatesList();
      if (state.currentTab === 'explore') renderExploreList();
    }
  });

  // Update All Button
  document.getElementById('btn-update-all').addEventListener('click', () => {
    const updates = getAvailableUpdates();
    if (updates.length > 0) {
      announceSR(`Aktualisiere alle ${updates.length} Apps...`);
      updates.forEach(u => startAppInstall(u.app));
    }
  });

  // Check Updates Now Button
  const btnCheckUpdates = document.getElementById('btn-check-updates-now');
  if (btnCheckUpdates) btnCheckUpdates.addEventListener('click', () => syncAllRepositories(false));

  // Self Update
  document.getElementById('btn-self-update').addEventListener('click', async () => {
    announceSR('Suche nach Updates für Lauju Store...');
    await syncAllRepositories(true);
    const self = getAvailableUpdates().find(u => u.app.packageName === STORE_PACKAGE);
    if (self) {
      announceSR(`Update auf Version ${self.app.versionName} gefunden. Installation startet.`);
      installAppSilently(self.app);
    } else {
      announceSR(`Lauju Store ist auf dem neuesten Stand (${APP_VERSION}).`);
      alert(`Lauju Store ist bereits auf dem neuesten Stand (${APP_VERSION}).`);
    }
  });

  // Intervall-Änderung speichern & neu planen
  const intervalSel = document.getElementById('setting-update-interval');
  if (intervalSel) {
    intervalSel.value = localStorage.getItem('lauju_store_interval') || '12';
    intervalSel.addEventListener('change', () => {
      localStorage.setItem('lauju_store_interval', intervalSel.value);
      scheduleAutoUpdates();
    });
  }
  const autoInst = document.getElementById('setting-auto-install');
  if (autoInst) {
    autoInst.checked = localStorage.getItem('lauju_store_auto_install') !== 'false';
    autoInst.addEventListener('change', () => localStorage.setItem('lauju_store_auto_install', String(autoInst.checked)));
  }

  // Theme wechseln
  document.getElementById('setting-theme').addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.value);
    localStorage.setItem('lauju_store_theme', e.target.value);
    announceSR(`Farbschema geändert auf: ${e.target.options[e.target.selectedIndex].text}`);
  });

  // Modal: Neue Paketquelle hinzufügen
  const btnAddRepo = document.getElementById('btn-add-repo');
  const addRepoModal = document.getElementById('add-repo-modal');
  const btnCloseRepoModal = document.getElementById('btn-close-repo-modal');
  const addRepoForm = document.getElementById('add-repo-form');

  btnAddRepo.addEventListener('click', () => {
    addRepoModal.style.display = 'flex';
  });
  btnCloseRepoModal.addEventListener('click', () => {
    addRepoModal.style.display = 'none';
  });

  addRepoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-repo-name').value.trim();
    const url = document.getElementById('input-repo-url').value.trim();
    const fp = document.getElementById('input-repo-fingerprint').value.trim();

    if (name && url) {
      const newRepo = {
        id: 'custom_' + Date.now(),
        name,
        url,
        fingerprint: fp,
        enabled: true,
        official: false
      };
      state.repositories.push(newRepo);
      saveRepositories();
      addRepoModal.style.display = 'none';
      addRepoForm.reset();
      announceSR(`Paketquelle ${name} erfolgreich hinzugefügt.`);
    }
  });
}

// 16. Automatische Update-Prüfung im Hintergrund
let autoUpdateTimer = null;

function getUpdateIntervalMs() {
  const val = document.getElementById('setting-update-interval')?.value || '12';
  if (val === 'manual') return 0;
  return parseInt(val, 10) * 60 * 60 * 1000;
}

async function runAutoUpdateCheck(force = false) {
  const intervalMs = getUpdateIntervalMs();
  const last = parseInt(localStorage.getItem('lauju_store_last_check') || '0', 10);
  if (!force && (intervalMs === 0 || Date.now() - last < intervalMs)) return;

  await syncAllRepositories(true);
  localStorage.setItem('lauju_store_last_check', String(Date.now()));

  const autoInstall = document.getElementById('setting-auto-install')?.checked;
  const updates = getAvailableUpdates();
  if (autoInstall && updates.length > 0) {
    announceSR(`${updates.length} Updates gefunden. Installation läuft im Hintergrund.`);
    for (const u of updates) {
      await installAppSilently(u.app);
    }
  }
}

function scheduleAutoUpdates() {
  if (autoUpdateTimer) clearInterval(autoUpdateTimer);
  // Alle 15 Minuten prüfen, ob das gewählte Intervall abgelaufen ist
  autoUpdateTimer = setInterval(() => runAutoUpdateCheck(false), 15 * 60 * 1000);
}

// Start
document.addEventListener('DOMContentLoaded', async () => {
  loadSettingsAndState();
  setupEventListeners();
  renderExploreList();
  updateBadgesAndLists();
  announceSR('Lauju Store bereit. 4 Bereiche verfügbar: Entdecken, Installiert, Updates, Einstellungen.');

  await syncInstalledFromDevice();
  scheduleAutoUpdates();
  runAutoUpdateCheck(false);

  // Beim Zurückkehren in die App erneut prüfen
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      syncInstalledFromDevice();
      runAutoUpdateCheck(false);
    }
  });
});
