document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);

    const exitBtn = document.querySelectorAll('.exit');

    exitBtn.forEach((item) => {
        item.addEventListener('click', () => {
            window.utils.deleteCookie('jwt');
            window.location = '/login';
        })
    });
});
