document.addEventListener('DOMContentLoaded', () => {
    const collectionItems = document.querySelectorAll('.collection-item');
    const btn = document.querySelector('.btn');
    const doctorId = document.querySelector('.main').getAttribute('data-doctor');
    let visitId = '';
    collectionItems.forEach(item => {
        item.addEventListener('click', () => {
            btn.classList.remove('disabled');
            item.classList.add('active');
            visitId = item.getAttribute('data-id');
        });
    })

    btn.addEventListener('click', (event) => {

        const data = {
            doctor: doctorId,
            visit: visitId
        }

        window.ajax('/record', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then((response) => {
                if (response) {
                    alert('Вы записаны на прием');
                    window.location = '/';
                }
            })
    })
});
