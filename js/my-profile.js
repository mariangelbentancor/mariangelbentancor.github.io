var forms = document.querySelectorAll('.needs-validation')
const primerNombre= document.getElementById ('primerNombre');
const segundoNombre= document.getElementById ('segundoNombre');
const primerApellido= document.getElementById ('primerApellido');
const segundoApellido= document.getElementById ('segundoApellido');
const celular= document.getElementById ('telContacto');
const email = document.getElementById('email');

if (localStorage.getItem('perfilUser')) {
    let dataUser =  JSON.parse (localStorage.getItem('perfilUser'))
    if (localStorage.getItem('mail')== dataUser.email){
        primerNombre.value = dataUser.primerNombre
        segundoNombre.value = dataUser.segundoNombre
        primerApellido.value = dataUser.primerApellido
        segundoApellido.value = dataUser.segundoApellido
        celular.value = dataUser.celular
    }
    
}

Array.prototype.slice.call(forms)
.forEach(function (form) {
    form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        let perfilUser= {
            primerNombre: primerNombre.value,
            segundoNombre: segundoNombre.value,
            primerApellido: primerApellido.value,
            segundoApellido: segundoApellido.value,
            email: email.value,
            celular: celular.value
        }
        localStorage.setItem ('perfilUser', JSON.stringify (perfilUser))
        event.preventDefault()
        event.stopPropagation()
        document.getElementById('exito').style.visibility = "visible"
      }
    form.classList.add('was-validated')
    }, false)
})

if (!localStorage.getItem('mail')) {
    window.location = 'index.html'
} else {
    email.value = localStorage.getItem('mail')
}