document.querySelector('.nav-item[title="Buxgalteriya"]').addEventListener('mouseenter', function () {
    document.getElementById('accounting-submenu').classList.remove('d-none');
});
document.querySelector('.nav-item[title="Buxgalteriya"]').addEventListener('mouseleave', function () {
    document.getElementById('accounting-submenu').classList.add('d-none');
});


// token = localStorage.getItem('token');
// if (!token) {
//     window.location.href = 'login.html';
// }