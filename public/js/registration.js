window.addEventListener('DOMContentLoaded', () => {
    const firstName = document.querySelector('#first_name');
    const secondName = document.querySelector('#second_name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('send')
        const data = {
            firstName: firstName.value,
            secondName: secondName.value,
            login: email.value,
            password: password.value
        }

        window.ajax('/register', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((response) => {
            if (response.message) {
                alert(response.message);
            } else {
                window.location = '/login'
            }
        })

    })
});
