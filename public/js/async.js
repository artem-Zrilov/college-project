'use strict';

(() => {
    const URL = '/api';
    const ajax = async (endpoint, params) => {
        return fetch(URL + endpoint, params)
            .then((response) => {
                return response.json();
            });
    }

    window.ajax = ajax;
})();
