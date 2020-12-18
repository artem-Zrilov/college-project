document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.login');
    const form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;

        window.ajax('/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            body: JSON.stringify({login, password}) // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.message) {
                alert(response.message);
            } else {
                window.utils.setCookie('jwt', response.token, {
                    expires: new Date( Date.now() + 3600000000)
                })
                setTimeout(() => window.location = '/', 400);
            }
        })
    })
})
