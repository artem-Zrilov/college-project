window.addEventListener('DOMContentLoaded', () => {
    const hidePreloader = (preloader) => {
        preloader.classList.remove('active');
    }

    const showPreloader = (preloader) => {
        preloader.classList.add('active');
    }

    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            'max-age': -1
        })
    }

    window.utils = {
        hidePreloader,
        showPreloader,
        setCookie,
        deleteCookie
    };
});
