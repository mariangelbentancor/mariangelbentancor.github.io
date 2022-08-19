document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login');

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const mailInput = form.querySelector('mail');
        const passwordInput = form.querySelector('password');

        if (mailInput.value == '' && passwordInput.value == '') {
            alert('Usuario y/o contraseña incorrecta!');
        }
        else {
            login(mailInput.value, passwordInput.value);
        };

    })