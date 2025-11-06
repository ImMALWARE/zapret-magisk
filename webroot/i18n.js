// Language translation system for the Zapret module UI
const translations = {
  ru: {
    // Navigation
    info: "Инфо",
    domains: "Домены",
    config: "Конфиг",
    check: "Проверка",

    // Index/Info page
    zapretRunning: "zapret работает",
    zapretNotRunning: "zapret не работает",
    stop: "Остановить",
    start: "Запустить",
    autostart: "Автозапуск",
    enabled: "Включен",
    disabled: "Выключен",
    status: "Статус",

    // Config page
    configTitle: "Конфиг zapret",
    save: "Сохранить",
    undo: "Отменить",
    restart: "Перезапустить zapret",
    saved: "Сохранено",
    configHelp: "Справка по переменным",
    hostsVar: "подставит путь к autohosts.txt",
    ignoreVar: "подставит путь к ignore.txt",
    youtubeVar: "подставит путь к /etc/youtube.txt",
    quicGoogleVar: "подставит путь к /etc/quic_initial_www_google_com.bin",
    tlsGoogleVar: "подставит путь к /etc/tls_clienthello_www_google_com.bin",

    // Domains page
    autohosts: "autohosts",
    ignore: "ignore",
    newDomain: "Новый домен",
    add: "Добавить",

    // Check page
    checkTitle: "Проверка",
    start: "Начать",

    // Placeholders
    enterDomain: "Введите домен",
  },
  en: {
    // Navigation
    info: "Info",
    domains: "Domains",
    config: "Config",
    check: "Check",

    // Index/Info page
    zapretRunning: "zapret is running",
    zapretNotRunning: "zapret is not running",
    stop: "Stop",
    start: "Start",
    autostart: "Autostart",
    enabled: "Enabled",
    disabled: "Disabled",
    status: "Status",

    // Config page
    configTitle: "Zapret Config",
    save: "Save",
    undo: "Undo",
    restart: "Restart zapret",
    saved: "Saved",
    configHelp: "Variable Help",
    hostsVar: "path to autohosts.txt",
    ignoreVar: "path to ignore.txt",
    youtubeVar: "path to /etc/youtube.txt",
    quicGoogleVar: "path to /etc/quic_initial_www_google_com.bin",
    tlsGoogleVar: "path to /etc/tls_clienthello_www_google_com.bin",

    // Domains page
    autohosts: "autohosts",
    ignore: "ignore",
    newDomain: "New Domain",
    add: "Add",

    // Check page
    checkTitle: "Check",
    start: "Start",

    // Placeholders
    enterDomain: "Enter domain",
  },
}

// Detect device language
function detectLanguage() {
  const lang = (navigator.language || navigator.userLanguage || "en").split("-")[0]
  return translations[lang] ? lang : "en"
}

// Get translation for a key
function t(key) {
  const lang = localStorage.getItem("zapret_lang") || detectLanguage()
  return translations[lang][key] || translations.en[key] || key
}

// Set language
function setLanguage(lang) {
  if (translations[lang]) {
    localStorage.setItem("zapret_lang", lang)
    location.reload()
  }
}

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem("zapret_lang") || detectLanguage()
}

// Export functions
window.t = t
window.setLanguage = setLanguage
window.getCurrentLanguage = getCurrentLanguage
