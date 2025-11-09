const strings = {
    ru: {
        zapret_working: 'zapret работает',
        stop: 'Остановить',
        not_working: 'zapret не работает',
        start: 'Запустить',
        is_on: 'Включен',
        is_off: 'Выключен',
        info: 'Инфо',
        domains: 'Домены',
        config: 'Конфиг',
        check: 'Проверка',
        autostart: 'Автозапуск',
        something_went_wrong: 'Что-то пошло не так',
        begin: 'Начать',
        saved: 'Сохранено',
        config_title: 'Конфиг zapret',
        save: 'Сохранить',
        cancel: 'Отменить',
        restart_zapret: 'Перезапустить zapret',
        will_set_path: ' — подставит путь к ',
        new_domain: 'Новый домен'
    },
    en: {
        zapret_working: 'zapret is running',
        stop: 'Stop',
        not_working: 'zapret is not running',
        start: 'Start',
        is_on: 'On',
        is_off: 'Off',
        info: 'Info',
        domains: 'Domains',
        config: 'Config',
        check: 'Check',
        autostart: 'Autorun',
        something_went_wrong: 'Something went wrong',
        begin: 'Begin',
        saved: 'Saved',
        config_title: 'zapret config',
        save: 'Save',
        cancel: 'Cancel',
        restart_zapret: 'Restart zapret',
        will_set_path: ' — will substitute the path to ',
        new_domain: 'New domain'
    }
}

function t(key) {
    const lang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    return strings[lang][key] || key;
}