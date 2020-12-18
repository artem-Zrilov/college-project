document.addEventListener('DOMContentLoaded', function() {
    M.Tabs.init(document.querySelectorAll('.tabs'));
    const preloader = document.querySelector('.preloader-wrapper');
    const cardsWrapper = document.querySelector('.cards');
    const cardFragment = document.querySelector('#card').content.querySelector('.col');

    const renderDoctors = (doctors) => {
        const fragment = document.createDocumentFragment();
        cardsWrapper.innerHTML = '';

        doctors.forEach(doctor => {
            const card = cardFragment.cloneNode(true);

            card.querySelector('.card-title').textContent = doctor.fullName;
            card.querySelector('.card-content p').textContent = doctor.description;
            card.querySelector('.btn-floating ').href = `/doctor/${doctor._id}`;
            card.querySelector('img').src = doctor.image || '/images/no-photo.png';
            fragment.append(card);
        })

        cardsWrapper.append(fragment)
    }

    const loadDoctors = (specialization) => {
        cardsWrapper.style.display= 'none';
        window.utils.showPreloader(preloader);
        window.ajax('/doctors', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({specialization}) // body data type must match "Content-Type" header
        })
            .then((doctors) => {
                renderDoctors(doctors);
            })
            .finally(() => {
                window.utils.hidePreloader(preloader);
                cardsWrapper.style.display= '';
            })


    }

    window.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('collection-item')) {
             loadDoctors(target.getAttribute('data-id'))
        }
    })
});
