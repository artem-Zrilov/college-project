document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.login');

    btn.addEventListener('click', () => {
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;

        window.ajax('/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            body: JSON.stringify({login, password}) // body data type must match "Content-Type" header
        }).then(() => {
            window.location = '/';
        })
    })
})
