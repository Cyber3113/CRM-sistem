import {API_URL} from "./CONSTANTS.js"

let loginForm = document.querySelector('.login-form');
let alertMessage = document.querySelector('.alert');
alertMessage.style.display = 'none';
loginForm.addEventListener('submit', function (e) {
    alertMessage.style.display = 'block';
    alertMessage.classList.remove('alert-success');
    alertMessage.classList.remove('alert-danger');
    alertMessage.classList.add('alert-warning');
    alertMessage.innerHTML = 'Iltimos kuting...';
    e.preventDefault();
    let formData = new FormData(loginForm);
    let data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    console.log(data)
    console.log('login submitted');
    axios.post(`${API_URL}auth/login/`, data).then(response => {
        console.log('response data', response.data);
        alertMessage.style.display = 'block';
        alertMessage.classList.remove('alert-danger');
        alertMessage.classList.remove('alert-warning');
        alertMessage.classList.add('alert-success');
        alertMessage.innerHTML = response.data.message;
        loginForm.reset();
        localStorage.clear();
        localStorage.setItem('token', response.data?.access);
        window.location.href = 'index.html';
    }).catch(error => {
        console.log('error', error.response.data?.message);
        alertMessage.innerHTML = error.response.data?.message;
        alertMessage.classList.add('alert-danger');
        alertMessage.style.display = 'block';
    })
})
