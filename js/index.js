button.addEventListener('click', (evento) => {
    evento.preventDefault();

    const data = {
        mail: mail.value,
        password: password.value,
    }
        if(data.mail !== '' && data.password !== ''){
        window.location.href = 'home.html';
        }else {
        alert('Correo y/o contraseña vacío, favor de completar')
        }
        
        localStorage.setItem('mail', data.mail)
});