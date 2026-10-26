// Lauju Store – Barrierefreier App Store (F-Droid & Neo Store Client)
// Entwickelt von Lauju1909 für 100% TalkBack- und Tastatur-Zugänglichkeit

const APP_VERSION = 'v1.0.16';
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

// 2. Integrierter Offline-Katalog für garantierte Verfügbarkeit (alle mit signierten Repository-APKs)
const INITIAL_APPS = [
  {
    id: 'finanzapp',
    packageName: 'de.lauri.finanzapp',
    name: 'Haushaltsbuch Barrierefrei',
    summary: 'Barrierefreie Finanzverwaltung, Haushaltsbuch, Verträge, Budgets & Quittungs-Scanner',
    description: 'Das barrierefreie Haushaltsbuch wurde speziell für blinde und sehbehinderte Menschen entwickelt. Es bietet volle TalkBack-Unterstützung, einfache Buchungserfassung, Vertragsverwaltung, sichere Backups und Beleg-Verwaltung ohne Cloud-Zwang.',
    versionName: '6.9.26',
    versionCode: 38,
    size: '3.6 MB',
    author: 'Lauju1909',
    category: 'productivity',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.finanzapp.png',
    license: 'MIT',
    repoId: 'lauju',
    paymentType: 'free',
    price: '',
    paymentUrl: 'https://ko-fi.com/lauju1909',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.finanzapp_6.9.26.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreieFinanzApp-Android',
    changelog: 'v6.9.26: Multiplattform-Synchronisation, Offline-Tresor & TalkBack-Verbesserungen.'
  },
  {
    id: 'stundenplan',
    packageName: 'de.lwl.stundenplan',
    name: 'Barrierefreies WebUntis',
    summary: 'Stundenplan & Vertretungsplan für Schüler am LWL-Berufskolleg Soest',
    description: 'Offizieller, 100% barrierefreier Stundenplan für blinde und sehbehinderte Schüler. Zeigt aktuelle Unterrichtsstunden, Raumänderungen, Vertretungen und den Mensa-Speiseplan mit optimierter Tastatur- und Screenreader-Bedienung.',
    versionName: '1.9.35',
    versionCode: 36,
    size: '3.2 MB',
    author: 'Lauju1909',
    category: 'education',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lwl.stundenplan.png',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lwl.stundenplan_1.9.35.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreierStundenplanLWL-Android',
    changelog: 'v1.9.35: Aktuelle Speisepläne, dynamische Kalenderwochen & TalkBack-Verbesserungen.'
  },
  {
    id: 'vokabelstar',
    packageName: 'de.lauri.vokabelstar',
    name: 'VokabelStar',
    summary: 'Barrierefreier Vokabeltrainer wie Duolingo – speziell optimiert für TalkBack & Screenreader',
    description: 'Lerne Fremdsprachen effektiv und barrierefrei auf deinem Smartphone. Unterstützt Word- und Excel-Dateien, Audio-Aussprache und verschiedene barrierefreie Abfragemodi ohne Schreibzwang.',
    versionName: '1.3.2',
    versionCode: 8,
    size: '3.5 MB',
    author: 'Lauju1909',
    category: 'education',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.vokabelstar.png',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.vokabelstar_1.3.2.apk',
    sourceUrl: 'https://github.com/Lauju1909/VokabelStar-Android',
    changelog: 'v1.3.2: Android 14/15 Unterstützung, optimierte Audio-Engine & Fehlerbehebungen.'
  },
  {
    id: 'vokabelmeister',
    packageName: 'de.lauri.vokabelmeister',
    name: 'VokabelMeister (Lernplattform)',
    summary: 'Barrierefreier schriftlicher Vokabeltrainer & Lernplattform mit Fehlertoleranz',
    description: 'Die mobile Lernplattform und schriftliche Vokabel-App bietet interaktive Übungen, Lernkarten, Tippfehlertoleranz und Tests in verschiedenen Fächern, optimiert für TalkBack und Großschrift.',
    versionName: '1.2.5',
    versionCode: 8,
    size: '3.5 MB',
    author: 'Lauju1909',
    category: 'education',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.lernplatform.png',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.lernplatform_1.2.5.apk',
    sourceUrl: 'https://github.com/Lauju1909/Lernplatform-Android',
    changelog: 'v1.2.5: Neue Quiz-Module, schnellere Ladezeiten & Fehlerbehebungen.'
  },
  {
    id: 'bfwenglisch',
    packageName: 'de.lauri.bfwenglisch',
    name: 'BFW Vokabel-Verwaltung',
    summary: 'Vokabel-Hub für Wirtschaftsenglisch BFW 1 & BFW 2 (VokabelStar & VokabelMeister)',
    description: 'Zentrale barrierefreie Vokabel-Management-App für die Berufsfachschule Wirtschaft mit allen offiziellen Themen aus BFW 1 & BFW 2, Universal-Import und englischer Sprachausgabe.',
    versionName: '1.2.1',
    versionCode: 4,
    size: '3.4 MB',
    author: 'Lauju1909',
    category: 'education',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.bfwenglisch.png',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.bfwenglisch_1.2.1.apk',
    sourceUrl: 'https://github.com/Lauju1909/BFW-Wirtschaftsenglisch-Android',
    changelog: 'v1.2.1: Direkt-Export für VokabelStar und VokabelMeister & TalkBack-Optimierung.'
  },
  {
    id: 'audiostudio',
    packageName: 'de.lauri.audiostudiotycoon',
    name: 'Audio Studio Tycoon',
    summary: 'Barrierefreie Spieleentwickler-Simulation komplett nach Gehör spielbar',
    description: 'Baue dein eigenes Gaming-Studio auf! Mit vollständiger Sprachausgabe, haptischem Feedback und spannenden Soundeffekten.',
    versionName: '1.0',
    versionCode: 1,
    size: '3.4 MB',
    author: 'Lauju1909',
    category: 'games',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.audiostudiotycoon.png',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.audiostudiotycoon_1.0.0.apk',
    sourceUrl: 'https://github.com/Lauju1909/Audio-Studio-Tycoon-Android',
    changelog: 'v1.0: Vollständig mit TalkBack spielbare Entwickler-Simulation.'
  },
  {
    id: 'minigames',
    packageName: 'de.lauri.minigames',
    name: 'Audio Mini Games',
    summary: 'Über 60 barrierefreie Minispiele spielbar nach Gehör und Haptik',
    description: 'Eine bunte Sammlung barrierefreier Reaktions-, Denk- und Rhythmusspiele ohne visuelle Barrieren.',
    versionName: '1.0',
    versionCode: 1,
    size: '3.5 MB',
    author: 'Lauju1909',
    category: 'games',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.minigames.png',
    license: 'MIT',
    repoId: 'lauju',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.minigames_1.0.0.apk',
    sourceUrl: 'https://github.com/Lauju1909/Mini_Game_Sammlung_Android',
    changelog: 'v1.0: Über 60 barrierefreie Audio-Minispiele für Android.'
  },
  {
    id: 'translator',
    packageName: 'com.talkback.translator',
    name: 'TalkBack Deutsch-Übersetzer',
    summary: 'Liest fremdsprachige Android-Apps live auf Deutsch für Screenreader vor',
    description: 'Ein mächtiges Barrierefreiheits-Tool: Übersetzt englische Bildschirminhalte live und gibt sie über die TalkBack-Sprachausgabe wieder.',
    versionName: '1.3.2',
    versionCode: 9,
    size: '5.1 MB',
    author: 'Lauju1909',
    category: 'accessibility',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/com.talkback.translator.png',
    license: 'MIT',
    repoId: 'lauju',
    isBeta: true,
    paymentType: 'free',
    paymentUrl: 'https://ko-fi.com/lauju1909',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/com.talkback.translator_1.3.2.apk',
    sourceUrl: 'https://github.com/Lauju1909/TalkBack-Deutsch-Uebersetzer-Android',
    changelog: 'v1.3.2: Schnelleres Live-Übersetzen und verbesserte Sprachausgabe.'
  },
  {
    id: 'appstore',
    packageName: 'de.lauri.appstore',
    name: 'Lauju Store',
    summary: 'Dieser barrierefreie Open-Source App Store (F-Droid & Neo Store Client)',
    description: 'Der moderne, barrierefreie Store für alle deine Android-Anwendungen. Unterstützt F-Droid Repositories, automatische Update-Prüfung, TalkBack-Optimierung und Google Play Protect Konformität.',
    versionName: '1.0.9',
    versionCode: 10,
    size: '3.8 MB',
    author: 'Lauju1909',
    category: 'tools',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.appstore.png',
    license: 'MIT',
    repoId: 'lauju',
    paymentType: 'free',
    price: '',
    paymentUrl: 'https://ko-fi.com/lauju1909',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.appstore_1.0.9.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreierAppStore-Android',
    changelog: 'v1.0.9: Offizielle F-Droid Katalog- und Update-Integration, TalkBack-Verbesserungen.'
  },
  {
    id: 'dokumentenbetrachter',
    packageName: 'de.lauri.dokumentenbetrachter',
    name: 'Dokumenten-Betrachter Barrierefrei',
    summary: 'Barrierefreier Office-Viewer für LibreOffice (ODT, ODS), Word (DOCX), PDF und Text',
    description: 'Speziell für Menschen mit Blindheit und Sehbehinderung entwickelt: Wandelt Office-Dokumente und Tabellen in semantische Textstrukturen mit TalkBack-Navigation und Sprachausgabe um.',
    versionName: '1.0.2',
    versionCode: 3,
    size: '3.5 MB',
    author: 'Lauju1909',
    category: 'tools',
    icon: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/icons/de.lauri.dokumentenbetrachter.png',
    license: 'MIT',
    repoId: 'lauju',
    paymentType: 'free',
    price: '',
    paymentUrl: '',
    apkUrl: 'https://lauju1909.github.io/fdroid-repo/fdroid/repo/de.lauri.dokumentenbetrachter_1.0.2.apk',
    sourceUrl: 'https://github.com/Lauju1909/BarrierefreierDokumentenBetrachter-Android',
    changelog: 'v1.0.2: Verbesserte PDF- und Office-Tabellen-Extraktion für TalkBack.'
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
    author: 'TeamNewPipe',
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
    versionName: '3.7.1',
    versionCode: 13070108,
    size: '34.8 MB',
    author: 'VideoLAN',
    category: 'tools',
    icon: '🎬',
    license: 'GPL-2.0',
    repoId: 'fdroid',
    apkUrl: 'https://f-droid.org/repo/org.videolan.vlc_13070108.apk',
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
  installedFilter: 'store_only',
  exploreVisibleCount: 40,
  repositories: [],
  apps: [],
  onlineSearchResults: [], // Dynamisch geladene F-Droid / Izzy Online-Ergebnisse
  isSearchingOnline: false,
  installedApps: {}, // packageName -> { versionName, versionCode, installedAt, name, iconBase64 }
  allDeviceApps: [], // Liste aller installierten Apps vom Gerät
  selectedApp: null
};

// 4. Übersetzungshilfe: Übersetzt englische Texte live ins Deutsche
const translationCache = new Map();

function isEnglishOrForeign(text) {
  if (!text || typeof text !== 'string') return false;
  // Typische englische Wörter erkennen
  const enWords = /\b(the|and|for|with|you|this|from|app|your|all|any|can|simple|fast|open|source|free|player|manager|client|tool|files|screen|device|support|remote|control)\b/i;
  // Typische deutsche Sonderzeichen ausschließen
  if (/[äöüß]/i.test(text)) return false;
  return enWords.test(text);
}

async function translateToGerman(text) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (trimmed.length === 0) return text;
  if (translationCache.has(trimmed)) return translationCache.get(trimmed);

  const autoTranslateEnabled = document.getElementById('setting-auto-translate')?.checked ?? true;
  if (!autoTranslateEnabled) return text;

  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=de&dt=t&q=' + encodeURIComponent(trimmed);
    const res = await fetch(url);
    if (!res.ok) return text;
    const json = await res.json();
    if (json && json[0] && Array.isArray(json[0])) {
      const translated = json[0].map(s => s[0]).join('');
      if (translated) {
        translationCache.set(trimmed, translated);
        return translated;
      }
    }
  } catch (e) {
    console.warn('Übersetzung fehlgeschlagen:', e);
  }
  return text;
}

// Online-Suche in offiziellen Repositories (F-Droid, Izzy)
let searchDebounceTimer = null;

async function performOnlineRepoSearch(query) {
  if (!query || query.trim().length < 2) {
    state.onlineSearchResults = [];
    state.isSearchingOnline = false;
    renderExploreList();
    return;
  }

  state.isSearchingOnline = true;
  const q = query.trim();

  try {
    const res = await fetch(`https://search.f-droid.org/?q=${encodeURIComponent(q)}`);
    if (!res.ok) {
      state.isSearchingOnline = false;
      return;
    }
    const html = await res.text();
    const pattern = /<a class="package-header" href="https:\/\/f-droid\.org\/[^/]+\/packages\/([^"\/]+)">([\s\S]*?)<\/a>/gi;
    let m;
    const found = [];
    const autoTranslate = document.getElementById('setting-auto-translate')?.checked ?? true;

    while ((m = pattern.exec(html)) !== null && found.length < 25) {
      const pkg = m[1];
      const block = m[2];
      const iconMatch = block.match(/<img class="package-icon" src="([^"]+)"/i);
      const nameMatch = block.match(/<h4 class="package-name">\s*([^<]+)\s*<\/h4>/i);
      const summaryMatch = block.match(/<span class="package-summary">\s*([^<]+)\s*<\/span>/i);
      const licenseMatch = block.match(/<span class="package-license">\s*([^<]+)\s*<\/span>/i);

      const rawName = nameMatch ? nameMatch[1].trim() : pkg;
      let rawSummary = summaryMatch ? summaryMatch[1].trim() : 'F-Droid Open Source Paket';

      // Falls bereits im lokalen Katalog vorhanden, nicht duplizieren
      if (state.apps.some(a => a.packageName === pkg)) continue;

      found.push({
        id: pkg,
        packageName: pkg,
        name: rawName,
        summary: rawSummary,
        rawSummary: rawSummary,
        description: rawSummary,
        versionName: 'Neueste',
        versionCode: 999999,
        size: 'F-Droid',
        author: 'F-Droid Community',
        category: 'tools',
        icon: iconMatch ? iconMatch[1] : '📦',
        license: licenseMatch ? licenseMatch[1].trim() : 'GPL / MIT',
        repoId: 'fdroid',
        apkUrl: `https://f-droid.org/repo/${pkg}.apk`,
        sourceUrl: `https://f-droid.org/packages/${pkg}/`,
        changelog: 'Offizielle F-Droid Version.',
        isOnlineResult: true
      });
    }

    // Automatische deutsche Übersetzung für englische Zusammenfassungen
    if (autoTranslate) {
      await Promise.all(found.map(async (item) => {
        if (isEnglishOrForeign(item.summary)) {
          item.summary = await translateToGerman(item.summary);
          item.description = item.summary;
        }
      }));
    }

    state.onlineSearchResults = found;
  } catch (e) {
    console.warn('Online-Suche fehlgeschlagen:', e);
  } finally {
    state.isSearchingOnline = false;
    if (state.currentTab === 'explore') renderExploreList();
  }
}

// 4. Barrierefreie Screenreader-Ansage mit serialisierter Warteschlange
const ALL_EMOJI_REGEX = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA9F}\u{231A}-\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2614}-\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}-\u{26AB}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}-\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{FE0F}]/gu;

function triggerAccessibleFeedback(type = 'tap') {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    const patterns = {
      tap: [15],
      success: [30, 50, 30],
      warning: [40, 60, 40],
      error: [80, 50, 80],
      boundary: [25, 25, 25]
    };
    try { navigator.vibrate(patterns[type] || [15]); } catch (_) {}
  }
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!window.__sharedAudioCtx) window.__sharedAudioCtx = new AudioContext();
    const ctx = window.__sharedAudioCtx;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    
    if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(164.81, now + 0.09); // E3
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'warning') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(392, now + 0.07);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'boundary') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else { // tap
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (_) {}
}

class AriaLiveQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.timer = null;
  }

  announce(message, priority = 'polite') {
    if (!message) return;
    const cleanMsg = String(message).replace(ALL_EMOJI_REGEX, '').trim();
    if (!cleanMsg) return;

    if (priority === 'assertive') {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.queue.unshift({ message: cleanMsg, priority: 'assertive' });
      this.isProcessing = false;
      this.processNext();
    } else {
      this.queue.push({ message: cleanMsg, priority: 'polite' });
      if (!this.isProcessing) {
        this.processNext();
      }
    }
  }

  processNext() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const item = this.queue.shift();
    const liveEl = document.getElementById('sr-announcer');

    if (liveEl) {
      liveEl.textContent = '';
      setTimeout(() => {
        liveEl.textContent = item.message;
        const readDuration = Math.max(1200, item.message.length * 65);
        this.timer = setTimeout(() => {
          this.processNext();
        }, readDuration);
      }, 50);
    } else {
      this.processNext();
    }
  }
}

const ariaLiveQueue = new AriaLiveQueue();

function announceSR(text, priority = 'polite') {
  ariaLiveQueue.announce(text, priority);
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
  // Repositories laden & F-Droid standardmäßig aktivieren
  const savedRepos = localStorage.getItem('lauju_store_repos');
  if (savedRepos) {
    try {
      state.repositories = JSON.parse(savedRepos);
      let fdroidRepo = state.repositories.find(r => r.id === 'fdroid');
      if (!fdroidRepo) {
        state.repositories.push({
          id: 'fdroid',
          name: '📦 F-Droid Official Repository',
          url: 'https://f-droid.org/repo',
          fingerprint: '',
          enabled: true,
          official: true
        });
      } else {
        fdroidRepo.enabled = true;
      }
    } catch(e) {
      state.repositories = DEFAULT_REPOSITORIES;
    }
  } else {
    state.repositories = DEFAULT_REPOSITORIES;
    localStorage.setItem('lauju_store_repos', JSON.stringify(DEFAULT_REPOSITORIES));
  }

  // Installierte Apps laden (ohne speicherintensive Icons)
  const savedInstalled = localStorage.getItem('lauju_store_installed');
  if (savedInstalled) {
    try { state.installedApps = JSON.parse(savedInstalled); } catch(e) { state.installedApps = {}; }
  } else {
    state.installedApps = {
      [STORE_PACKAGE]: { versionName: APP_VERSION.replace('v', ''), versionCode: 10, installedAt: Date.now() }
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

  // Veraltete/fehlerhafte 404-URLs & Entwicklernamen mit GitHub-Benutzernamen aktualisieren
  state.apps.forEach(app => {
    if (app.author === 'Laurin Schneider' || (app.repoId === 'lauju' && (!app.author || app.author === 'Laurin Schneider'))) {
      app.author = 'Lauju1909';
    }
    const fresh = INITIAL_APPS.find(init => init.packageName === app.packageName);
    if (fresh) {
      if (fresh.author) app.author = fresh.author;
      if (!app.apkUrl ||
          app.apkUrl.includes('MiniGameSammlung.apk') ||
          app.apkUrl.includes('AudioStudioTycoon.apk') ||
          app.apkUrl.includes('TalkBackTranslator.apk') ||
          app.apkUrl.includes('app-release-unsigned.apk') ||
          app.apkUrl.includes('org.videolan.vlc_3050407.apk')) {
        app.apkUrl = fresh.apkUrl;
        app.versionCode = fresh.versionCode;
        app.versionName = fresh.versionName;
        app.icon = fresh.icon;
      }
    }
  });

  // Theme anwenden
  const savedTheme = localStorage.getItem('lauju_store_theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  const themeSelect = document.getElementById('setting-theme');
  if (themeSelect) themeSelect.value = savedTheme;

  document.getElementById('store-version-display').textContent = APP_VERSION;
}

function saveInstalledApps() {
  try {
    const cleanInstalled = {};
    Object.keys(state.installedApps).forEach(pkg => {
      const inst = state.installedApps[pkg];
      cleanInstalled[pkg] = {
        name: inst.name,
        versionName: inst.versionName,
        versionCode: inst.versionCode,
        installedAt: inst.installedAt
      };
    });
    localStorage.setItem('lauju_store_installed', JSON.stringify(cleanInstalled));
  } catch (e) {
    console.warn('saveInstalledApps storage quota limit:', e);
  }
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
  // Pool kombinieren: Lokaler Katalog + dynamische Online-Suchergebnisse
  const combined = [...appsPool];
  if (state.searchQuery.trim() !== '' && state.onlineSearchResults.length > 0) {
    state.onlineSearchResults.forEach(onl => {
      if (!combined.some(a => a.packageName === onl.packageName)) {
        combined.push(onl);
      }
    });
  }

  return combined.filter(app => {
    // Repositories-Filter (Quelle muss aktiv sein, außer es ist ein dynamisches Suchergebnis)
    if (!app.isOnlineResult) {
      const repo = state.repositories.find(r => r.id === app.repoId);
      if (repo && !repo.enabled) return false;
    }

    // Status-Filter aus apps.json (nur freigegebene Apps anzeigen, es sei denn vom Nutzer selbst eingereicht)
    if (app.status && app.status !== 'approved' && !app.isLocalSubmission) {
      return false;
    }

    // Kategorie-Filter
    if (state.currentCategory !== 'all' && app.category !== state.currentCategory) {
      return false;
    }

    // Suchfilter (Name, Zusammenfassung, Paket-ID und Autor)
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = app.name.toLowerCase().includes(q);
      const matchSummary = (app.summary || '').toLowerCase().includes(q);
      const matchRawSummary = (app.rawSummary || '').toLowerCase().includes(q);
      const matchPkg = app.packageName.toLowerCase().includes(q);
      const matchAuthor = (app.author || '').toLowerCase().includes(q);
      if (!matchName && !matchSummary && !matchRawSummary && !matchPkg && !matchAuthor) return false;
    }

    // Beta-Versionen Filter (nur anzeigen, wenn Schalter aktiv ist)
    const showBeta = document.getElementById('setting-show-beta')?.checked ?? false;
    if (app.isBeta && !showBeta && state.currentSort !== 'filter_beta') {
      return false;
    }

    // Zusätzlicher Modus-Filter (Kostenlos, Kauf, Spende, Beta)
    if (state.currentSort === 'filter_free' && app.paymentType && app.paymentType !== 'free') return false;
    if (state.currentSort === 'filter_paid' && app.paymentType !== 'paid') return false;
    if (state.currentSort === 'filter_donation' && app.paymentType !== 'donation') return false;
    if (state.currentSort === 'filter_beta' && !app.isBeta) return false;

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

// 9. Apps im "Entdecken"-Tab rendern (mit TalkBack-Optimierung, Autor-Anzeige und stufenweisem Laden)
function renderExploreList() {
  const container = document.getElementById('explore-apps-list');
  const countBadge = document.getElementById('app-count-badge');
  const filtered = getFilteredApps(state.apps);

  countBadge.textContent = `${filtered.length}`;
  container.innerHTML = '';

  if (state.isSearchingOnline) {
    const searchingBanner = document.createElement('div');
    searchingBanner.className = 'empty-placeholder';
    searchingBanner.style.padding = '12px';
    searchingBanner.innerHTML = `<span>⏳ Durchsuche alle F-Droid Paketquellen nach "${state.searchQuery}"...</span>`;
    container.appendChild(searchingBanner);
  }

  if (filtered.length === 0 && !state.isSearchingOnline) {
    container.innerHTML = `
      <div class="empty-placeholder" style="grid-column: 1/-1;">
        <span class="placeholder-icon">🔍</span>
        <h3>Keine Apps gefunden</h3>
        <p>Versuche einen anderen Suchbegriff oder passe den Kategorie-Filter an.</p>
      </div>
    `;
    return;
  }

  const maxInitial = state.exploreVisibleCount || 40;
  const itemsToRender = filtered.slice(0, maxInitial);

  itemsToRender.forEach(app => {
    const isInstalled = !!state.installedApps[app.packageName];
    const isPaid = (app.paymentType === 'paid');
    const showAuthor = app.author && (!app.hideAuthor || isPaid);
    const authorText = showAuthor ? app.author : '';

    const card = document.createElement('article');
    card.className = 'app-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${app.name}, Version ${app.versionName}${showAuthor ? ', Entwickler: ' + authorText : ''}. ${isInstalled ? 'Bereits installiert.' : 'Nicht installiert.'}`);

    card.innerHTML = `
      <div class="app-card-icon" aria-hidden="true">${renderAppIconHtml(app.icon)}</div>
      <div class="app-card-info">
        <h3 class="app-card-title">${app.name}</h3>
        <p class="app-card-desc">${app.summary}</p>
        <div class="app-card-meta">
          <span class="app-card-version">v${app.versionName}</span>
          <span>•</span>
          <span>${app.size}</span>
          <span>•</span>
          <span>${getRepoBadge(app.repoId)}</span>
          ${showAuthor ? `<span>•</span><span style="color: var(--md-sys-color-primary);">👤 ${authorText}</span>` : ''}
          ${app.paymentType === 'paid' ? `<span>•</span><span style="color: #f0883e; font-weight: bold;">💰 ${app.price || 'Kauf'}</span>` : ''}
          ${app.paymentType === 'donation' ? `<span>•</span><span style="color: #d29922; font-weight: bold;">☕ Spende</span>` : ''}
          ${app.isBeta ? `<span>•</span><span style="color: #8957e5; font-weight: bold;">🧪 Beta</span>` : ''}
        </div>
      </div>
      <div class="app-card-action">
        <button class="btn ${isInstalled ? 'outline' : 'primary'}" aria-label="${isInstalled ? app.name + ' öffnen' : app.name + ' installieren'}">
          ${isInstalled ? 'Öffnen' : 'Laden'}
        </button>
      </div>
    `;

    card.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      if (isInstalled) {
        openAppByPackage(app.packageName, app.name);
      } else {
        openAppDetails(app);
      }
    });

    card.addEventListener('click', () => openAppDetails(app));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAppDetails(app);
      }
    });

    container.appendChild(card);
  });

  if (filtered.length > maxInitial) {
    const loadMoreRow = document.createElement('div');
    loadMoreRow.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 18px 0;';
    const remaining = filtered.length - maxInitial;
    loadMoreRow.innerHTML = `
      <button class="btn primary btn-large" style="min-width: 260px;" aria-label="${remaining} weitere Apps im Katalog anzeigen">
        ➕ Weitere Apps laden (+${remaining > 40 ? 40 : remaining} von ${remaining})
      </button>
    `;
    loadMoreRow.querySelector('button').addEventListener('click', () => {
      state.exploreVisibleCount = (state.exploreVisibleCount || 40) + 40;
      renderExploreList();
      announceSR(`${Math.min(filtered.length, state.exploreVisibleCount)} Apps werden jetzt angezeigt.`);
    });
    container.appendChild(loadMoreRow);
  }
}

function renderAppIconHtml(icon) {
  if (!icon) return '📦';
  if (icon.startsWith('data:image') || icon.startsWith('http://') || icon.startsWith('https://')) {
    return `<img src="${icon}" alt="" loading="lazy">`;
  }
  return icon;
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

  let listToRender = [];
  const filter = state.installedFilter || 'store_only';

  if (filter === 'all_device' && state.allDeviceApps && state.allDeviceApps.length > 0) {
    listToRender = state.allDeviceApps.map(dev => {
      const catalogApp = state.apps.find(a => a.packageName === dev.packageName);
      return {
        packageName: dev.packageName,
        name: dev.name || dev.packageName,
        versionName: dev.versionName || '1.0',
        versionCode: dev.versionCode || 1,
        icon: dev.iconBase64 || (catalogApp ? catalogApp.icon : '📱'),
        summary: catalogApp ? catalogApp.summary : `Paket: ${dev.packageName}`,
        isSystem: dev.isSystem,
        catalogApp: catalogApp || null
      };
    });
  } else {
    const installedKeys = Object.keys(state.installedApps);
    listToRender = installedKeys.map(pkg => {
      const inst = state.installedApps[pkg];
      const catalogApp = state.apps.find(a => a.packageName === pkg);
      return {
        packageName: pkg,
        name: inst.name || (catalogApp ? catalogApp.name : pkg),
        versionName: inst.versionName || (catalogApp ? catalogApp.versionName : '1.0'),
        versionCode: inst.versionCode || 1,
        icon: inst.iconBase64 || (catalogApp ? catalogApp.icon : '📱'),
        summary: catalogApp ? catalogApp.summary : 'Auf diesem Gerät installiert',
        isSystem: false,
        catalogApp: catalogApp || null
      };
    });
  }

  // Suchfilter auf installierte Apps anwenden
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    listToRender = listToRender.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.packageName.toLowerCase().includes(q) ||
      (item.summary && item.summary.toLowerCase().includes(q))
    );
  }

  countBadge.textContent = `${listToRender.length}`;
  container.innerHTML = '';

  if (listToRender.length === 0) {
    placeholder.style.display = 'block';
    return;
  }
  placeholder.style.display = 'none';

  listToRender.forEach(item => {
    const card = document.createElement('article');
    card.className = 'app-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${item.name}, Version ${item.versionName}. Installiert.`);

    card.innerHTML = `
      <div class="app-card-icon" aria-hidden="true">${renderAppIconHtml(item.icon)}</div>
      <div class="app-card-info">
        <h3 class="app-card-title">${item.name}</h3>
        <p class="app-card-desc">${item.summary}</p>
        <div class="app-card-meta">
          <span class="app-card-version">v${item.versionName}</span>
          <span>•</span>
          <span style="color: var(--md-sys-color-success);">✅ Installiert</span>
        </div>
      </div>
      <div class="app-card-action">
        <button class="btn primary btn-open-card" aria-label="${item.name} starten">Öffnen</button>
        <button class="btn danger btn-uninstall-card" aria-label="${item.name} deinstallieren" title="Deinstallieren">🗑️</button>
      </div>
    `;

    card.querySelector('.btn-open-card').addEventListener('click', (e) => {
      e.stopPropagation();
      openAppByPackage(item.packageName, item.name);
    });

    card.querySelector('.btn-uninstall-card').addEventListener('click', (e) => {
      e.stopPropagation();
      uninstallAppByPackage(item.packageName, item.name);
    });

    card.addEventListener('click', () => {
      const fullApp = item.catalogApp || {
        id: item.packageName,
        packageName: item.packageName,
        name: item.name,
        summary: item.summary,
        description: `Installierte Anwendung auf deinem Gerät.\nPaketname: ${item.packageName}\nVersion: v${item.versionName}`,
        versionName: item.versionName,
        versionCode: item.versionCode,
        size: 'Installiert',
        author: item.isSystem ? 'Systemanwendung' : 'Installierte App',
        category: 'tools',
        icon: item.icon,
        license: 'Installiert',
        repoId: 'lokal',
        apkUrl: '',
        sourceUrl: '',
        changelog: 'Lokal auf dem Android-Gerät installiert.'
      };
      openAppDetails(fullApp);
    });

    container.appendChild(card);
  });
}

// 11. Updates ermitteln & rendern
function getAvailableUpdates() {
  const updates = [];
  Object.keys(state.installedApps).forEach(pkg => {
    const installed = state.installedApps[pkg];
    const available = state.apps.find(a => a.packageName === pkg);
    if (available && installed) {
      const codeNew = parseInt(available.versionCode, 10) || 0;
      const codeInst = parseInt(installed.versionCode, 10) || 0;
      
      let isUpdate = false;
      if (codeNew > 0 && codeInst > 0) {
        isUpdate = codeNew > codeInst;
      } else if (available.versionName && installed.versionName) {
        // Fallback falls keine versionCodes vorliegen
        isUpdate = available.versionName !== installed.versionName;
      }

      if (isUpdate) {
        updates.push({ app: available, installedVersion: installed.versionName || '?' });
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
      <div class="app-card-icon" aria-hidden="true">${renderAppIconHtml(app.icon)}</div>
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
async function openAppDetails(app) {
  state.selectedApp = app;
  const isInstalled = !!state.installedApps[app.packageName] ||
    (state.allDeviceApps && state.allDeviceApps.some(a => a.packageName === app.packageName));
  const updates = getAvailableUpdates();
  const hasUpdate = updates.some(u => u.app.packageName === app.packageName);

  document.getElementById('modal-app-icon').innerHTML = renderAppIconHtml(app.icon);
  document.getElementById('modal-app-title').textContent = app.name;

  const authorEl = document.getElementById('modal-app-author');
  const isPaid = (app.paymentType === 'paid');
  const shouldHideAuthor = !!app.hideAuthor && !isPaid;

  if (shouldHideAuthor) {
    authorEl.style.display = 'none';
  } else {
    authorEl.style.display = 'block';
    authorEl.textContent = `Von: ${app.author || 'Open Source Entwickler'}`;
  }

  document.getElementById('modal-app-version').textContent = `v${app.versionName}`;
  document.getElementById('modal-app-size').textContent = app.size || '3.5 MB';
  document.getElementById('modal-app-repo').textContent = getRepoBadge(app.repoId);

  const descEl = document.getElementById('modal-app-description');
  const transBadge = document.getElementById('modal-translation-badge');

  let rawDesc = app.description || app.summary || 'Keine Beschreibung vorhanden.';
  descEl.textContent = rawDesc;
  if (transBadge) transBadge.style.display = 'none';

  document.getElementById('modal-app-changelog').textContent = app.changelog || 'Fehlerbehebungen und Leistungsoptimierungen.';
  document.getElementById('modal-app-package').textContent = app.packageName;
  document.getElementById('modal-app-license').textContent = app.license || 'MIT / Open Source';
  document.getElementById('modal-link-source').href = app.sourceUrl || 'https://github.com/Lauju1909';

  const actionBtn = document.getElementById('modal-btn-action');
  const uninstallBtn = document.getElementById('modal-btn-uninstall');
  const payBtn = document.getElementById('modal-btn-pay');

  if (hasUpdate) {
    actionBtn.textContent = '🔄 Auf v' + app.versionName + ' aktualisieren';
    actionBtn.className = 'btn primary btn-large';
    uninstallBtn.style.display = 'inline-flex';
  } else if (isInstalled) {
    actionBtn.textContent = '▶️ App öffnen';
    actionBtn.className = 'btn outline btn-large';
    uninstallBtn.style.display = 'inline-flex';
  } else {
    actionBtn.textContent = '📥 Installieren (' + (app.size || 'F-Droid') + ')';
    actionBtn.className = 'btn primary btn-large';
    uninstallBtn.style.display = 'none';
  }

  // Bezahl- / Spenden-Button konfigurieren (Weg 1 & Weg 3)
  if (payBtn) {
    if (app.paymentUrl) {
      payBtn.style.display = 'inline-flex';
      payBtn.href = app.paymentUrl;
      if (app.paymentType === 'paid') {
        const pr = app.price ? ` (${app.price})` : '';
        payBtn.textContent = `💰 Kaufen${pr}`;
        payBtn.className = 'btn primary btn-large';
      } else {
        payBtn.textContent = '☕ Spenden / Unterstützen';
        payBtn.className = 'btn outline btn-large';
      }
    } else {
      payBtn.style.display = 'none';
    }
  }

  // Fortschrittsbalken zurücksetzen
  document.getElementById('modal-download-progress').style.display = 'none';
  document.getElementById('modal-progress-fill').style.width = '0%';

  const modal = document.getElementById('app-detail-modal');
  modal.style.display = 'flex';
  announceSR(`App-Details für ${app.name} geöffnet.`);

  // Falls es sich um ein Online-Suchergebnis oder F-Droid Paket handelt, lade reale APK-URL & Details aus f-droid.org
  if ((app.isOnlineResult || app.repoId === 'fdroid') && (!app.realDetailsLoaded || (app.apkUrl && app.apkUrl.endsWith(`${app.packageName}.apk`)))) {
    try {
      const apiRes = await fetch(`https://f-droid.org/api/v1/packages/${app.packageName}`);
      if (apiRes.ok) {
        const pkgData = await apiRes.json();
        if (pkgData && pkgData.packages && pkgData.packages.length > 0) {
          const latestPkg = pkgData.packages[0];
          app.versionCode = latestPkg.versionCode || app.versionCode;
          app.versionName = latestPkg.versionName || app.versionName;
          app.apkUrl = `https://f-droid.org/repo/${app.packageName}_${latestPkg.versionCode}.apk`;
          if (latestPkg.hash) app.sha256 = latestPkg.hash;
          document.getElementById('modal-app-version').textContent = `v${app.versionName}`;
        }
      }
    } catch(e) {}
    try {
      const res = await fetch(`https://f-droid.org/en/packages/${app.packageName}/`);
      if (res.ok) {
        const pageHtml = await res.text();
        const fullDescMatch = pageHtml.match(/<div class="package-description"[^>]*>([\s\S]*?)<\/div>/i);
        const apkMatch = pageHtml.match(/<a href="([^"]+\.apk)">/i);
        const versionMatch = pageHtml.match(/<b>Version\s+([^<]+)<\/b>/i);

        if (apkMatch && apkMatch[1] && (!app.apkUrl || app.apkUrl.endsWith(`${app.packageName}.apk`))) {
          app.apkUrl = apkMatch[1];
        }
        if (versionMatch && versionMatch[1] && (!app.versionName || app.versionName === 'Neueste')) {
          app.versionName = versionMatch[1].trim();
          document.getElementById('modal-app-version').textContent = `v${app.versionName}`;
        }
        if (fullDescMatch && fullDescMatch[1]) {
          const cleanDesc = fullDescMatch[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
          if (cleanDesc) {
            rawDesc = cleanDesc;
            app.description = cleanDesc;
          }
        }
        app.realDetailsLoaded = true;
      }
    } catch (e) {
      console.warn('Laden der Detailseite fehlgeschlagen:', e);
    }
  }

  // Automatische Übersetzung ins Deutsche bei englischem Text
  const autoTranslate = document.getElementById('setting-auto-translate')?.checked ?? true;
  if (autoTranslate && isEnglishOrForeign(rawDesc)) {
    if (transBadge) {
      transBadge.style.display = 'inline-block';
      transBadge.textContent = '⏳ Übersetze auf Deutsch...';
    }
    const germanDesc = await translateToGerman(rawDesc);
    if (state.selectedApp && state.selectedApp.packageName === app.packageName) {
      descEl.textContent = germanDesc;
      if (transBadge) {
        transBadge.textContent = '🇩🇪 Auf Deutsch übersetzt';
      }
    }
  }
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

// Reales Öffnen & Deinstallieren über nativen Installer
async function openAppByPackage(packageName, appName = '') {
  const native = getNativeInstaller();
  if (native) {
    try {
      await native.openApp({ packageName });
      announceSR(`${appName || packageName} wird gestartet.`);
    } catch (e) {
      announceSR(`Konnte ${appName || packageName} nicht öffnen: ${e.message || e}`);
      alert(`Konnte App nicht starten: ${e.message || e}`);
    }
  } else {
    announceSR(`${appName || packageName} öffnen (Simulation im Webbrowser).`);
  }
}

async function uninstallAppByPackage(packageName, appName = '') {
  const native = getNativeInstaller();
  if (native) {
    try {
      await native.uninstallApp({ packageName });
      announceSR(`Deinstallation für ${appName || packageName} aufgerufen.`);
    } catch (e) {
      announceSR(`Fehler beim Aufruf der Deinstallation: ${e.message || e}`);
    }
  }
  // Lokal sofort austragen
  delete state.installedApps[packageName];
  state.allDeviceApps = state.allDeviceApps.filter(a => a.packageName !== packageName);
  saveInstalledApps();
  closeAppDetails();
  if (state.currentTab === 'installed') renderInstalledList();
  if (state.currentTab === 'updates') renderUpdatesList();
  if (state.currentTab === 'explore') renderExploreList();
}

async function syncInstalledFromDevice() {
  const native = getNativeInstaller();
  if (!native) return;
  try {
    const { apps } = await native.getInstalledApps({ includeSystem: false });
    state.allDeviceApps = apps || [];
    const known = new Set(state.apps.map(a => a.packageName));
    const installed = {};
    (apps || []).forEach(p => {
      if (known.has(p.packageName)) {
        installed[p.packageName] = {
          versionName: p.versionName,
          versionCode: p.versionCode,
          name: p.name,
          iconBase64: p.iconBase64 || null,
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

// Hilfsfunktion: WLAN-Bedingung prüfen (falls in den Einstellungen aktiv)
async function checkWifiRequirement() {
  const wifiOnly = document.getElementById('setting-wifi-only')?.checked ?? true;
  if (!wifiOnly) return true;
  const native = getNativeInstaller();
  if (!native) return true;
  try {
    const { isWifi } = await native.isWifiConnected();
    if (!isWifi) {
      announceSR('Download abgebrochen: Nur über WLAN herunterladen ist aktiv, aber kein WLAN verbunden.');
      alert('Download pausiert: Du bist nicht mit einem WLAN verbunden und in den Einstellungen ist "Nur über WLAN herunterladen" aktiviert.');
      return false;
    }
  } catch (e) {
    console.warn('WLAN-Status konnte nicht ermittelt werden', e);
  }
  return true;
}

// Hilfsobjekt zur Nachverfolgung ausstehender Installationen
const pendingInstallResolvers = new Map();

// Globaler Listener für das native installResult Event
function initNativeInstallListener() {
  const native = getNativeInstaller();
  if (native && native.addListener) {
    native.addListener('installResult', (res) => {
      console.log('installResult empfangen:', res);
      const pkg = res.packageName;
      if (pkg && pendingInstallResolvers.has(pkg)) {
        const resolver = pendingInstallResolvers.get(pkg);
        pendingInstallResolvers.delete(pkg);
        resolver(res);
      }
    });
  }
}

// Wartet auf das native Ergebnis der Paketinstallation (oder Timeout)
function waitForInstallResult(packageName, timeoutMs = 25000) {
  return new Promise((resolve) => {
    let timer = null;
    const onResult = (res) => {
      if (timer) clearTimeout(timer);
      resolve(res);
    };
    pendingInstallResolvers.set(packageName, onResult);

    timer = setTimeout(() => {
      if (pendingInstallResolvers.has(packageName)) {
        pendingInstallResolvers.delete(packageName);
        resolve({ success: false, timeout: true, packageName });
      }
    }, timeoutMs);
  });
}

// Installiert ohne UI (für automatische Updates)
async function installAppSilently(app) {
  const native = getNativeInstaller();
  if (!native) {
    window.open(app.apkUrl, '_blank');
    return;
  }
  if (!(await ensureInstallPermission())) return;
  if (!(await checkWifiRequirement())) return;

  try {
    if (app.repoId === 'fdroid' && (!app.realDetailsLoaded || !app.apkUrl || app.apkUrl.endsWith(`${app.packageName}.apk`))) {
      try {
        const apiRes = await fetch(`https://f-droid.org/api/v1/packages/${app.packageName}`);
        if (apiRes.ok) {
          const pkgData = await apiRes.json();
          if (pkgData && pkgData.packages && pkgData.packages.length > 0) {
            const latestPkg = pkgData.packages[0];
            app.versionCode = latestPkg.versionCode || app.versionCode;
            app.versionName = latestPkg.versionName || app.versionName;
            app.apkUrl = `https://f-droid.org/repo/${app.packageName}_${latestPkg.versionCode}.apk`;
            if (latestPkg.hash) app.sha256 = latestPkg.hash;
          }
        }
      } catch(e) {}
    }

    const verifyChecksum = document.getElementById('setting-verify-checksum')?.checked ?? true;
    const sha256 = (verifyChecksum && app.sha256) ? app.sha256 : '';

    const installPromise = waitForInstallResult(app.packageName, 30000);

    await native.downloadAndInstall({
      url: app.apkUrl,
      fileName: `${app.packageName}_${app.versionCode}.apk`,
      sha256,
      packageName: app.packageName
    });

    const result = await installPromise;
    if (result && result.success) {
      state.installedApps[app.packageName] = {
        versionName: app.versionName,
        versionCode: app.versionCode,
        name: app.name,
        iconBase64: app.icon || null,
        installedAt: Date.now()
      };
      saveInstalledApps();
      await syncInstalledFromDevice();
      updateBadgesAndLists();
    }

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
  if (!(await checkWifiRequirement())) return;

  if (progressBox) progressBox.style.display = 'block';
  if (progressFill) progressFill.style.width = '5%';
  if (progressLabel) progressLabel.textContent = `Verbinde für ${app.name}...`;
  if (actionBtn) actionBtn.disabled = true;
  announceSR(`Download von ${app.name} gestartet...`);

  try {
    if (app.repoId === 'fdroid' && (!app.realDetailsLoaded || !app.apkUrl || app.apkUrl.endsWith(`${app.packageName}.apk`))) {
      try {
        const apiRes = await fetch(`https://f-droid.org/api/v1/packages/${app.packageName}`);
        if (apiRes.ok) {
          const pkgData = await apiRes.json();
          if (pkgData && pkgData.packages && pkgData.packages.length > 0) {
            const latestPkg = pkgData.packages[0];
            app.versionCode = latestPkg.versionCode || app.versionCode;
            app.versionName = latestPkg.versionName || app.versionName;
            app.apkUrl = `https://f-droid.org/repo/${app.packageName}_${latestPkg.versionCode}.apk`;
            if (latestPkg.hash) app.sha256 = latestPkg.hash;
          }
        }
      } catch(e) {}
    }

    const verifyChecksum = document.getElementById('setting-verify-checksum')?.checked ?? true;
    const sha256 = (verifyChecksum && app.sha256) ? app.sha256 : '';

    const installPromise = waitForInstallResult(app.packageName, 30000);

    await native.downloadAndInstall({
      url: app.apkUrl,
      fileName: `${app.packageName}_${app.versionCode}.apk`,
      sha256,
      packageName: app.packageName
    });

    if (progressFill) progressFill.style.width = '100%';
    if (progressLabel) progressLabel.textContent = 'Installation läuft auf dem Gerät...';
    announceSR(`${app.name} heruntergeladen. Installation wird ausgeführt.`);

    // Auf die tatsächliche Beendigung der Installation durch das System warten
    const installRes = await installPromise;
    playAudioCue();

    // Sofort lokal den Status auf neu aktualisieren
    state.installedApps[app.packageName] = {
      versionName: app.versionName,
      versionCode: app.versionCode,
      name: app.name,
      iconBase64: app.icon || null,
      installedAt: Date.now()
    };
    saveInstalledApps();

    if (progressLabel) {
      if (installRes.success) {
        progressLabel.textContent = `Erfolgreich auf Version ${app.versionName} aktualisiert!`;
      } else {
        progressLabel.textContent = `Installation abgeschlossen.`;
      }
    }
    announceSR(`${app.name} wurde erfolgreich installiert.`);
  } catch (e) {
    if (progressLabel) progressLabel.textContent = 'Fehler: ' + (e.message || e);
    announceSR(`Installation von ${app.name} fehlgeschlagen: ${e.message || e}`);
  } finally {
    if (actionBtn) actionBtn.disabled = false;
    // System-Sync durchführen
    await syncInstalledFromDevice();
    updateBadgesAndLists();

    if (state.selectedApp && state.selectedApp.packageName === app.packageName) {
      openAppDetails(app);
    }
    if (state.currentTab === 'explore') renderExploreList();
    if (state.currentTab === 'updates') renderUpdatesList();
    if (state.currentTab === 'installed') renderInstalledList();
  }
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

function normalizeAppCategory(categories, defaultCat = 'tools') {
  if (!categories || categories.length === 0) return defaultCat;
  const raw = Array.isArray(categories) ? categories.join(' ').toLowerCase() : String(categories).toLowerCase();
  if (raw.includes('accessib') || raw.includes('screen') || raw.includes('blind') || raw.includes('speech')) return 'accessibility';
  if (raw.includes('financ') || raw.includes('productiv') || raw.includes('money') || raw.includes('wallet') || raw.includes('time') || raw.includes('shop')) return 'productivity';
  if (raw.includes('educat') || raw.includes('learn') || raw.includes('read') || raw.includes('book') || raw.includes('dict') || raw.includes('translat')) return 'education';
  if (raw.includes('game') || raw.includes('play') || raw.includes('puzzle') || raw.includes('casual')) return 'games';
  return 'tools';
}

async function syncAllRepositories(silent = false) {
  if (!silent) announceSR('Synchronisiere alle aktiven Paketquellen...');
  const syncBtn = document.getElementById('btn-sync-all');
  if (syncBtn) syncBtn.classList.add('pulsing');

  // Vor dem Sync aktuelle installierte Apps vom Gerät einlesen
  await syncInstalledFromDevice();

  let changed = false;

  // 1. Zuerst zentrale Metadaten & Admin-Zentrale Konfigurationen (apps.json) abrufen
  let customAppsMap = new Map();
  try {
    const appsJsonUrls = [
      `https://raw.githubusercontent.com/Lauju1909/fdroid-repo/main/apps.json?t=${Date.now()}`,
      `https://lauju1909.github.io/fdroid-repo/apps.json?t=${Date.now()}`
    ];
    let customList = null;
    for (const u of appsJsonUrls) {
      try {
        const r = await fetch(u, { cache: 'no-store' });
        if (r.ok) {
          customList = await r.json();
          if (Array.isArray(customList) && customList.length > 0) break;
        }
      } catch(e) {}
    }

    if (Array.isArray(customList)) {
      customList.forEach(item => {
        const pkg = item.id || item.packageName;
        if (pkg) customAppsMap.set(pkg, item);
      });

      // Bestehende Katalog-Apps mit Admin-Zentrale Metadaten anreichern
      customList.forEach(item => {
        const pkg = item.id || item.packageName;
        if (!pkg) return;

        const existing = state.apps.find(a => a.packageName === pkg || a.id === pkg);
        if (existing) {
          if (item.author) existing.author = item.author;
          if (item.paymentType) existing.paymentType = item.paymentType;
          if (item.price !== undefined) existing.price = item.price;
          if (item.paymentUrl !== undefined) existing.paymentUrl = item.paymentUrl;
          if (item.isBeta !== undefined) existing.isBeta = !!item.isBeta;
          if (item.status) existing.status = item.status;
          // Regel: Bei bezahlten Apps kann der Autor nicht ausgeblendet werden
          existing.hideAuthor = (existing.paymentType === 'paid') ? false : !!item.hideAuthor;
          if (item.desc || item.description) existing.description = item.desc || item.description;
          if (item.category) existing.category = item.category;
          if (item.name && item.name !== existing.packageName) existing.name = item.name;
          if (item.icon && !existing.icon?.startsWith('data:image')) existing.icon = item.icon;
          changed = true;
        } else if (item.status === 'approved') {
          state.apps.push({
            id: pkg,
            packageName: pkg,
            name: item.name || pkg,
            summary: item.desc || 'Barrierefreie App aus dem Lauju Ökosystem',
            description: item.desc || '',
            versionName: '1.0.0',
            versionCode: 1,
            size: '~10 MB',
            author: item.author || 'Lauju1909',
            hideAuthor: (item.paymentType === 'paid') ? false : !!item.hideAuthor,
            category: item.category || 'tools',
            icon: item.icon || '📦',
            license: 'Open Source',
            repoId: 'lauju',
            apkUrl: `https://lauju1909.github.io/fdroid-repo/fdroid/repo/${pkg}_1.apk`,
            sha256: '',
            paymentType: item.paymentType || 'free',
            price: item.price || '',
            paymentUrl: item.paymentUrl || '',
            isBeta: !!item.isBeta,
            status: item.status,
            sourceUrl: item.repo ? `https://github.com/${item.repo}` : '',
            changelog: 'Offizielle Store-Veröffentlichung.'
          });
          changed = true;
        }
      });
    }
  } catch (e) {
    console.warn('Metadaten-Sync von apps.json fehlgeschlagen:', e);
  }

  // 2. F-Droid & Lauju Paketquellen (index-v1.json) synchronisieren
  for (const repo of state.repositories.filter(r => r.enabled)) {
    try {
      const base = repo.url.replace(/\/+$/, '');
      const res = await fetch(`${base}/index-v1.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      const pkgs = data.packages || {};
      const allApps = data.apps || [];

      // Sortieren: Kürzlich aktualisierte Apps nach oben
      if (repo.id === 'fdroid') {
        allApps.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
      }

      let importedCount = 0;
      const installedPkgSet = new Set(Object.keys(state.installedApps || {}));
      if (state.allDeviceApps) {
        state.allDeviceApps.forEach(d => installedPkgSet.add(d.packageName));
      }

      for (let i = 0; i < allApps.length; i++) {
        const meta = allApps[i];
        const versions = pkgs[meta.packageName];
        if (!versions || versions.length === 0) continue;
        const latest = versions.reduce((a, b) => (b.versionCode > a.versionCode ? b : a), versions[0]);
        const apkUrl = `${base}/${latest.apkName}`;
        const sizeMb = latest.size ? `${(latest.size / 1048576).toFixed(1)} MB` : '';
        const sha256 = latest.hash || latest.sha256 || '';

        // Deutsche oder beste verfügbare Lokalisierung auswählen
        const loc = meta.localized ? (meta.localized['de-DE'] || meta.localized['de'] || meta.localized['en-US'] || meta.localized['en']) : null;
        const resolvedName = (loc && loc.name) || meta.name || meta.packageName;
        const resolvedSummary = (loc && loc.summary) || meta.summary || '';
        const resolvedDesc = (loc && loc.description) || meta.description || resolvedSummary;
        const changelogText = (loc && loc.whatsNew) || meta.changelog || `v${latest.versionName}`;

        // Icon auflösen (URL oder Fallback)
        let iconFile = (loc && loc.icon) || meta.icon || meta.iconName || '';
        let iconUrl = iconFile ? `${base}/icons/${iconFile}` : '';

        const category = normalizeAppCategory(meta.categories, meta.category || 'tools');
        const customMeta = customAppsMap.get(meta.packageName);

        const existing = state.apps.find(a => a.packageName === meta.packageName);
        if (existing) {
          if (latest.versionCode >= (existing.versionCode || 0)) {
            if (existing.versionCode !== latest.versionCode) changed = true;
            existing.versionName = latest.versionName;
            existing.versionCode = latest.versionCode;
            existing.apkUrl = apkUrl;
            if (sizeMb) existing.size = sizeMb;
            existing.repoId = repo.id;
            if (sha256) existing.sha256 = sha256;
            if (iconUrl && !existing.icon?.startsWith('data:image')) existing.icon = iconUrl;
            if (resolvedName && resolvedName !== existing.packageName) existing.name = resolvedName;
            if (resolvedSummary) existing.summary = resolvedSummary;
            if (resolvedDesc) existing.description = resolvedDesc;
            if (category) existing.category = category;
            if (changelogText) existing.changelog = changelogText;

            // Vorrang für customMeta aus apps.json / Admin-Zentrale
            if (customMeta) {
              if (customMeta.paymentType) existing.paymentType = customMeta.paymentType;
              if (customMeta.price !== undefined) existing.price = customMeta.price;
              if (customMeta.paymentUrl !== undefined) existing.paymentUrl = customMeta.paymentUrl;
              if (customMeta.isBeta !== undefined) existing.isBeta = !!customMeta.isBeta;
              if (customMeta.author) existing.author = customMeta.author;
              existing.hideAuthor = (existing.paymentType === 'paid') ? false : !!customMeta.hideAuthor;
              if (customMeta.desc) existing.description = customMeta.desc;
              if (customMeta.status) existing.status = customMeta.status;
            } else {
              if (meta.paymentUrl) existing.paymentUrl = meta.paymentUrl;
              if (meta.paymentType) existing.paymentType = meta.paymentType;
              if (meta.price) existing.price = meta.price;
              if (meta.isBeta !== undefined) existing.isBeta = meta.isBeta;
            }
          }
        } else {
          // Aufnehmen: Alle Lauju-Apps, alle auf dem Gerät installierten Apps (für Updates!)
          // sowie die Top-Apps aus F-Droid (bis zu 400 Apps im Hauptkatalog für blitzschnelle Ladezeiten)
          const isInstalledOnDevice = installedPkgSet.has(meta.packageName);
          const shouldIncludeInCatalog = (repo.id !== 'fdroid') || isInstalledOnDevice || (importedCount < 400);

          if (shouldIncludeInCatalog) {
            const authorName = customMeta?.author || meta.authorName || (repo.id === 'lauju' ? 'Lauju1909' : 'F-Droid');
            const paymentType = customMeta?.paymentType || meta.paymentType || 'free';
            const hideAuthor = (paymentType === 'paid') ? false : !!customMeta?.hideAuthor;

            state.apps.push({
              id: meta.packageName,
              packageName: meta.packageName,
              name: (customMeta?.name) || resolvedName,
              summary: resolvedSummary,
              description: (customMeta?.desc) || resolvedDesc,
              versionName: latest.versionName,
              versionCode: latest.versionCode,
              size: sizeMb || '? MB',
              author: authorName,
              hideAuthor: hideAuthor,
              category: (customMeta?.category) || category,
              icon: (customMeta?.icon && !customMeta.icon.startsWith('data:image')) ? customMeta.icon : (iconUrl || '📦'),
              license: meta.license || 'Open Source',
              repoId: repo.id,
              apkUrl,
              sha256: sha256,
              paymentType: paymentType,
              price: customMeta?.price || meta.price || '',
              paymentUrl: customMeta?.paymentUrl || meta.paymentUrl || '',
              isBeta: customMeta?.isBeta !== undefined ? !!customMeta.isBeta : (!!meta.isBeta || latest.versionName?.toLowerCase().includes('beta')),
              status: customMeta?.status || 'approved',
              sourceUrl: meta.sourceCode || (customMeta?.repo ? `https://github.com/${customMeta.repo}` : ''),
              changelog: changelogText
            });
            changed = true;
            importedCount++;
          }
        }
      }
    } catch (e) {
      console.warn('Sync fehlgeschlagen für', repo.url, e);
    }
  }

  // Quota-sichere Speicherung im LocalStorage
  try {
    const appsToPersist = state.apps.slice(0, 400).map(a => {
      const copy = { ...a };
      if (copy.icon && copy.icon.startsWith('data:image')) copy.icon = '📦';
      return copy;
    });
    localStorage.setItem('lauju_store_catalog', JSON.stringify(appsToPersist));
  } catch (e) {
    console.warn('Quota limit beim Speichern des Katalogs:', e);
  }

  await syncInstalledFromDevice();

  if (syncBtn) syncBtn.classList.remove('pulsing');
  if (!silent) {
    playAudioCue();
    announceSR(`Alle Paketquellen synchronisiert. ${state.apps.length} Apps im Katalog verfügbar.`);
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

    // Debounce für Online-Suche in offiziellen Repositories
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    if (state.currentTab === 'explore' && state.searchQuery.trim().length >= 2) {
      searchDebounceTimer = setTimeout(() => {
        performOnlineRepoSearch(state.searchQuery);
      }, 500);
    } else {
      state.onlineSearchResults = [];
      state.isSearchingOnline = false;
    }
  });
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    state.onlineSearchResults = [];
    state.isSearchingOnline = false;
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
      const isInstalled = !!state.installedApps[state.selectedApp.packageName] ||
        (state.allDeviceApps && state.allDeviceApps.some(a => a.packageName === state.selectedApp.packageName));
      const updates = getAvailableUpdates();
      const hasUpdate = updates.some(u => u.app.packageName === state.selectedApp.packageName);
      if (hasUpdate || !isInstalled) {
        startAppInstall(state.selectedApp);
      } else {
        openAppByPackage(state.selectedApp.packageName, state.selectedApp.name);
      }
    }
  });

  document.getElementById('modal-btn-uninstall').addEventListener('click', () => {
    if (state.selectedApp) {
      uninstallAppByPackage(state.selectedApp.packageName, state.selectedApp.name);
    }
  });

  // Filter für installierte Apps (Store vs. Alle Apps auf dem Gerät)
  const filterSelect = document.getElementById('installed-filter-select');
  if (filterSelect) {
    filterSelect.value = state.installedFilter || 'store_only';
    filterSelect.addEventListener('change', (e) => {
      state.installedFilter = e.target.value;
      renderInstalledList();
      announceSR(e.target.value === 'all_device' ? 'Alle Geräte-Apps werden angezeigt.' : 'Nur Store-Apps werden angezeigt.');
    });
  }

  // Update All Button: Sequentielle Warteschlange
  document.getElementById('btn-update-all').addEventListener('click', async () => {
    let updates = getAvailableUpdates();
    if (updates.length === 0) return;

    const btn = document.getElementById('btn-update-all');
    btn.disabled = true;
    announceSR(`Aktualisiere ${updates.length} Apps nacheinander im Hintergrund...`);

    for (let i = 0; i < updates.length; i++) {
      const u = updates[i];
      btn.textContent = `⏳ Update ${i + 1}/${updates.length}: ${u.app.name}`;
      announceSR(`Aktualisiere ${u.app.name} (${i + 1} von ${updates.length})...`);
      await startAppInstall(u.app);
      // Kurze Pause zwischen Installationen
      await new Promise(r => setTimeout(r, 1000));
    }

    await syncInstalledFromDevice();
    updateBadgesAndLists();
    renderUpdatesList();
    if (state.currentTab === 'explore') renderExploreList();
    if (state.currentTab === 'installed') renderInstalledList();

    btn.disabled = false;
    btn.textContent = `⚡ Alle aktualisieren`;
    announceSR('Alle verfügbaren Updates wurden durchgeführt und Listen aktualisiert.');
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

  // Intervall-Änderung speichern & WorkManager / Timer neu planen
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

  // WLAN & Checksum Einstellungs-Speicherung
  const wifiOnlyCheckbox = document.getElementById('setting-wifi-only');
  if (wifiOnlyCheckbox) {
    wifiOnlyCheckbox.checked = localStorage.getItem('lauju_store_wifi_only') !== 'false';
    wifiOnlyCheckbox.addEventListener('change', () => {
      localStorage.setItem('lauju_store_wifi_only', String(wifiOnlyCheckbox.checked));
      scheduleAutoUpdates();
    });
  }
  const checksumCheckbox = document.getElementById('setting-verify-checksum');
  if (checksumCheckbox) {
    checksumCheckbox.checked = localStorage.getItem('lauju_store_verify_checksum') !== 'false';
    checksumCheckbox.addEventListener('change', () => {
      localStorage.setItem('lauju_store_verify_checksum', String(checksumCheckbox.checked));
    });
  }

  // Auto-Translate Einstellungs-Speicherung
  const autoTranslateCheckbox = document.getElementById('setting-auto-translate');
  if (autoTranslateCheckbox) {
    autoTranslateCheckbox.checked = localStorage.getItem('lauju_store_auto_translate') !== 'false';
    autoTranslateCheckbox.addEventListener('change', () => {
      localStorage.setItem('lauju_store_auto_translate', String(autoTranslateCheckbox.checked));
      announceSR(autoTranslateCheckbox.checked ? 'Automatische deutsche Übersetzung aktiviert.' : 'Automatische Übersetzung deaktiviert.');
    });
  }

  // Beta-Versionen Einstellungs-Speicherung
  const showBetaCheckbox = document.getElementById('setting-show-beta');
  if (showBetaCheckbox) {
    showBetaCheckbox.checked = localStorage.getItem('lauju_store_show_beta') === 'true';
    showBetaCheckbox.addEventListener('change', () => {
      localStorage.setItem('lauju_store_show_beta', String(showBetaCheckbox.checked));
      announceSR(showBetaCheckbox.checked ? 'Beta-Versionen werden jetzt im Store angezeigt.' : 'Beta-Versionen ausgeblendet.');
      renderExploreList();
    });
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

  // Modal: In-App Publisher Hub
  const btnOpenPub = document.getElementById('btn-open-publisher-modal');
  const pubModal = document.getElementById('publisher-modal');
  const btnClosePub = document.getElementById('btn-close-publisher-modal');
  const pubForm = document.getElementById('inapp-publisher-form');
  const pubPaymentSelect = document.getElementById('pub-payment-type');

  if (btnOpenPub && pubModal) {
    btnOpenPub.addEventListener('click', () => {
      pubModal.style.display = 'flex';
      renderPublisherSavedList();
      announceSR('App-Einreichungs-Portal geöffnet.');
    });
    btnClosePub.addEventListener('click', () => {
      pubModal.style.display = 'none';
    });

    function validatePubHideAuthor() {
      const v = pubPaymentSelect.value;
      const chk = document.getElementById('pub-hide-author');
      const hint = document.getElementById('pub-hide-author-hint');
      if (v === 'paid') {
        chk.checked = false;
        chk.disabled = true;
        if (hint) hint.style.display = 'block';
      } else {
        chk.disabled = false;
        if (hint) hint.style.display = 'none';
      }
    }

    pubPaymentSelect.addEventListener('change', () => {
      const v = pubPaymentSelect.value;
      document.getElementById('pub-row-price').style.display = (v === 'paid') ? 'block' : 'none';
      document.getElementById('pub-row-payment-url').style.display = (v === 'paid' || v === 'donation') ? 'block' : 'none';
      validatePubHideAuthor();
    });

    document.getElementById('btn-pub-check').addEventListener('click', async () => {
      const repoUrl = document.getElementById('pub-github-repo').value.trim();
      if (!repoUrl) return alert('Bitte zuerst eine GitHub URL eingeben.');
      const clean = repoUrl.replace('https://github.com/', '').replace(/\/+$/, '');
      try {
        announceSR('Prüfe GitHub Repository...');
        const res = await fetch(`https://api.github.com/repos/${clean}`);
        if (!res.ok) throw new Error('Repository nicht gefunden');
        const data = await res.json();
        document.getElementById('pub-preview-name').textContent = data.name;
        document.getElementById('pub-preview-ver').textContent = data.default_branch || 'main';
        document.getElementById('pub-preview-box').style.display = 'block';

        // Felder automatisch vorausfüllen, falls noch leer
        if (!document.getElementById('pub-name').value) document.getElementById('pub-name').value = data.name;
        if (!document.getElementById('pub-summary').value && data.description) document.getElementById('pub-summary').value = data.description;
        if (!document.getElementById('pub-desc').value && data.description) document.getElementById('pub-desc').value = data.description;
        if (!document.getElementById('pub-icon').value) document.getElementById('pub-icon').value = `https://raw.githubusercontent.com/${clean}/main/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`;
        if (!document.getElementById('pub-package').value) {
          const autoPkg = 'de.lauri.' + data.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          document.getElementById('pub-package').value = autoPkg;
        }

        announceSR(`Repository ${data.name} geladen und Formularfelder vorausgefüllt.`);
      } catch (e) {
        alert('Fehler beim Abrufen der GitHub-Daten: ' + e.message);
      }
    });

    pubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const repoUrl = document.getElementById('pub-github-repo').value.trim();
      const cleanRepo = repoUrl.replace('https://github.com/', '').replace(/\/+$/, '');
      const name = document.getElementById('pub-name').value.trim();
      const pkg = document.getElementById('pub-package').value.trim();
      const summary = document.getElementById('pub-summary').value.trim();
      const desc = document.getElementById('pub-desc').value.trim();
      const icon = document.getElementById('pub-icon').value.trim();
      const category = document.getElementById('pub-category').value;
      const paymentType = pubPaymentSelect.value;
      const price = document.getElementById('pub-price').value.trim();
      const paymentUrl = document.getElementById('pub-payment-url').value.trim();
      const isBeta = document.getElementById('pub-is-beta').checked;
      const hideAuthor = (paymentType === 'paid') ? false : document.getElementById('pub-hide-author').checked;

      // Lokal in der Store-App merken
      const myApps = JSON.parse(localStorage.getItem('lauju_my_published_apps') || '[]');
      const newEntry = {
        repo: cleanRepo,
        name: name || cleanRepo,
        packageName: pkg,
        summary,
        description: desc,
        icon,
        category,
        paymentType,
        price,
        paymentUrl,
        isBeta,
        hideAuthor,
        submittedAt: Date.now()
      };
      
      const exIdx = myApps.findIndex(a => a.repo.toLowerCase() === cleanRepo.toLowerCase());
      if (exIdx >= 0) {
        myApps[exIdx] = newEntry;
      } else {
        myApps.push(newEntry);
      }
      localStorage.setItem('lauju_my_published_apps', JSON.stringify(myApps));
      renderPublisherSavedList();

      // Auch direkt im lokalen App-Katalog bereitstellen, damit der Nutzer seine App sofort im Store sieht!
      const catIdx = state.apps.findIndex(a => a.packageName === pkg || a.id === cleanRepo);
      const storeItem = {
        id: pkg,
        packageName: pkg,
        name: name,
        summary: summary,
        description: desc || summary,
        versionName: '1.0.0',
        versionCode: 1,
        size: 'GitHub Source',
        author: cleanRepo.split('/')[0] || 'Lauju Entwickler',
        category: category,
        icon: icon || '📦',
        license: 'MIT / Open Source',
        repoId: 'lauju',
        paymentType: paymentType,
        price: price,
        paymentUrl: paymentUrl,
        isBeta: isBeta,
        hideAuthor: hideAuthor,
        apkUrl: `https://github.com/${cleanRepo}/releases/latest/download/app-release-unsigned.apk`,
        sourceUrl: `https://github.com/${cleanRepo}`,
        changelog: 'Neu über den In-App Publisher Hub eingereicht.'
      };

      if (catIdx >= 0) {
        state.apps[catIdx] = storeItem;
      } else {
        state.apps.push(storeItem);
      }
      localStorage.setItem('lauju_store_catalog', JSON.stringify(state.apps));
      renderExploreList();

      // GitHub Issue-Link öffnen für offizielle Freischaltung
      const title = `[App Einreichung / Update] ${name} (${cleanRepo})`;
      const body = `### App Einreichung aus Lauju Store\n\n` +
                   `- **Repo:** https://github.com/${cleanRepo}\n` +
                   `- **Name:** ${name}\n` +
                   `- **Paket-ID:** ${pkg}\n` +
                   `- **Kategorie:** ${category}\n` +
                   `- **Kurzbeschreibung:** ${summary}\n` +
                   `- **Modell:** ${paymentType}\n` +
                   `- **Preis:** ${price || 'Kostenlos'}\n` +
                   `- **Zahlungslink:** ${paymentUrl || 'Keiner'}\n` +
                   `- **Beta:** ${isBeta ? 'Ja' : 'Nein'}\n` +
                   `- **Autor verbergen:** ${hideAuthor ? 'Ja (Nur für Gratis-/Spenden-Apps)' : 'Nein (Autor wird angezeigt)'}\n\n` +
                   `*Eingereicht und lokal gespeichert über die Lauju Store Android App.*`;

      const issueUrl = `https://github.com/Lauju1909/fdroid-repo/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
      window.open(issueUrl, '_blank');
      announceSR(`${name} lokal gespeichert und GitHub-Antrag geöffnet.`);
      alert(`App "${name}" wurde erfolgreich lokal gespeichert und im Store-Katalog hinterlegt!\nDas GitHub-Fenster zur offiziellen Freischaltung wurde geöffnet.`);
    });
  }
}

function renderPublisherSavedList() {
  const container = document.getElementById('pub-saved-list');
  if (!container) return;
  const list = JSON.parse(localStorage.getItem('lauju_my_published_apps') || '[]');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p style="color: var(--md-sys-color-on-surface-variant); font-size: 13px;">Noch keine Apps lokal eingereicht.</p>';
    return;
  }

  list.forEach((item, idx) => {
    const el = document.createElement('div');
    el.style.cssText = 'padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;';
    el.innerHTML = `
      <div>
        <strong style="font-size: 14px;">${item.name}</strong>
        <div style="font-size: 12px; color: var(--md-sys-color-on-surface-variant);">${item.repo} • ${item.paymentType} ${item.price ? '(' + item.price + ')' : ''} ${item.isBeta ? '• 🧪 Beta' : ''} ${item.hideAuthor ? '• 🙈 Autor verborgen' : ''}</div>
      </div>
      <button class="btn outline" style="font-size: 12px; padding: 4px 8px;">✏️ Laden</button>
    `;

    el.querySelector('button').addEventListener('click', () => {
      document.getElementById('pub-github-repo').value = 'https://github.com/' + item.repo;
      document.getElementById('pub-payment-type').value = item.paymentType || 'free';
      document.getElementById('pub-price').value = item.price || '';
      document.getElementById('pub-payment-url').value = item.paymentUrl || '';
      document.getElementById('pub-is-beta').checked = !!item.isBeta;
      document.getElementById('pub-hide-author').checked = !!item.hideAuthor;
      const v = item.paymentType;
      document.getElementById('pub-row-price').style.display = (v === 'paid') ? 'block' : 'none';
      document.getElementById('pub-row-payment-url').style.display = (v === 'paid' || v === 'donation') ? 'block' : 'none';
      const chk = document.getElementById('pub-hide-author');
      const hint = document.getElementById('pub-hide-author-hint');
      if (v === 'paid') {
        chk.checked = false;
        chk.disabled = true;
        if (hint) hint.style.display = 'block';
      } else {
        chk.disabled = false;
        if (hint) hint.style.display = 'none';
      }
      document.getElementById('pub-name').value = item.name || '';
      document.getElementById('pub-package').value = item.packageName || '';
      document.getElementById('pub-summary').value = item.summary || '';
      document.getElementById('pub-desc').value = item.description || '';
      document.getElementById('pub-icon').value = item.icon || '';
      if (item.category) document.getElementById('pub-category').value = item.category;
      document.getElementById('pub-preview-name').textContent = item.name;
      document.getElementById('pub-preview-ver').textContent = 'Lokal gespeichert';
      document.getElementById('pub-preview-box').style.display = 'block';
      announceSR(`Alle Daten für ${item.name} in das Formular geladen.`);
    });

    container.appendChild(el);
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
  // Alle 15 Minuten prüfen, ob das gewählte Intervall abgelaufen ist (solange App offen ist)
  autoUpdateTimer = setInterval(() => runAutoUpdateCheck(false), 15 * 60 * 1000);

  // Nativ über Android WorkManager planen (für Hintergrundprüfungen, auch wenn App beendet ist)
  const native = getNativeInstaller();
  if (native && native.scheduleBackgroundUpdateCheck) {
    const val = document.getElementById('setting-update-interval')?.value || '12';
    const hours = (val === 'manual') ? 0 : parseInt(val, 10);
    const wifiOnly = document.getElementById('setting-wifi-only')?.checked ?? true;
    native.scheduleBackgroundUpdateCheck({ hours, wifiOnly }).catch(e => {
      console.warn('Native UpdateCheck-Planung fehlgeschlagen:', e);
    });
  }
}

// Start
document.addEventListener('DOMContentLoaded', async () => {
  loadSettingsAndState();
  setupEventListeners();
  initNativeInstallListener();
  renderExploreList();
  updateBadgesAndLists();
  announceSR('Lauju Store bereit. 4 Bereiche verfügbar: Entdecken, Installiert, Updates, Einstellungen.');

  // Live-Download-Fortschritt vom nativen Plugin empfangen
  const native = getNativeInstaller();
  if (native && native.addListener) {
    native.addListener('downloadProgress', (info) => {
      const progressBox = document.getElementById('modal-download-progress');
      const progressFill = document.getElementById('modal-progress-fill');
      const progressLabel = document.getElementById('modal-progress-label');

      if (progressBox && info) {
        progressBox.style.display = 'block';
        if (info.percent >= 0) {
          if (progressFill) progressFill.style.width = `${info.percent}%`;
          const mbDownloaded = (info.downloadedBytes / 1048576).toFixed(1);
          const mbTotal = info.totalBytes > 0 ? (info.totalBytes / 1048576).toFixed(1) : '?';
          if (progressLabel) progressLabel.textContent = `Lade herunter... ${info.percent}% (${mbDownloaded} / ${mbTotal} MB)`;
        } else {
          if (progressFill) progressFill.style.width = '60%';
          if (progressLabel) progressLabel.textContent = 'Lade Daten herunter...';
        }
      }
    });
  }

  await syncInstalledFromDevice();
  scheduleAutoUpdates();
  syncAllRepositories(true);
  runAutoUpdateCheck(false);

  // Beim Zurückkehren in die App erneut prüfen
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      syncInstalledFromDevice();
      syncAllRepositories(true);
      runAutoUpdateCheck(false);
    }
  });
});
