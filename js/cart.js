const CARTURL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

document.addEventListener('DOMContentLoaded', async function () {
  const listado = document.getElementById('infoCart');
  const listadoInfoCart = await getJSONData(CARTURL);

  listadoInfoCart.data.articles.forEach(function (cart) {
    listado.innerHTML += getHTML(cart)
  })

  document.getElementById("subT").innerHTML = "15200"

});


function getHTML(cart) {
    return `<tr>
    <th scope="row"><img class="img-fluid" width="60" height="60"src="${cart.image}" alt=""></th>
    <td><p>${cart.name}</p></td>
    <td>${cart.currency} ${cart.unitCost}</td> 
    <td><input id="cantidad" type="number" min="1" max="100" value="${cart.count}" oninput="subTotal(${cart.unitCost})"></td>
    <td><strong> ${cart.currency}<span id="multiplicacion">  ${cart.unitCost * cart.count}</span></strong></td>
    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
  </svg><td>
    </tr>`;
};

const costo = document.getElementById('costo');
const total = document.getElementById('total');
const premium = document.getElementById('premium');
const express = document.getElementById('express');
const standard = document.getElementById('standard');


function subTotal(precio) {
  const cantidadCart = document.getElementById('cantidad').value
  const multiplicacionCart = document.getElementById('multiplicacion')
  multiplicacionCart.innerHTML = cantidadCart * precio
  document.getElementById("subT").innerHTML = cantidadCart * precio
  if (porcentaje > 0)
  costo.innerHTML = calculoEnvio (porcentaje)
  if (costo.textContent == 0) {
    total.innerHTML = subT.textContent
  }
  else {
    total.innerHTML = costoTotal ().toString ();
  }
}

function calculoEnvio (porcentaje){
  if (porcentaje == 5){
    return subT.textContent * 0.05
  }
  if (porcentaje == 7){
    return subT.textContent * 0.07
  }
  if (porcentaje == 15){
    return subT.textContent * 0.15
  }
}

function costoTotal () {
  var precio = parseInt(subT.textContent)
  var porcentajePorPrecio = parseInt (costo.textContent)
  return precio + porcentajePorPrecio
}

premium.addEventListener ('click', function(){
  if (premium.checked) {
  porcentaje = 15
  costo.innerHTML= calculoEnvio (porcentaje)
  total.innerHTML = costoTotal ().toString();
  }
})

express.addEventListener ('click', function() {
  if (express.checked) {
  porcentaje= 7
  costo.innerHTML= calculoEnvio (porcentaje)
  }
})

standard.addEventListener ('click', function() {
  if (standard.checked) {
  porcentaje= 5
  costo.innerHTML= calculoEnvio (porcentaje)
  }
})


const radioTarjCred = document.getElementById('radios1');
const radioTransf = document.getElementById('radios2');
const tarjeta = document.getElementById('inputTarjeta');
const codigo = document.getElementById('inputCodigo');
const venc = document.getElementById("inputVenc");
const transf = document.getElementById('transferencia');
const seleccionado = document.getElementById('seleccionado');

radioTarjCred.addEventListener ('click', function (){
  transf.disabled = true
  if (radioTarjCred.checked = true) {
    tarjeta.disabled = false
    codigo.disabled = false 
    venc.disabled = false 
    seleccionado.innerHTML = `Tarjeta de crédito &nbsp;&nbsp;`
  }
})

radioTransf.addEventListener ('click', function (){
    tarjeta.disabled = true
    codigo.disabled = true
    venc.disabled = true 
  if (radioTransf.checked = true) {
    transf.disabled = false 
    seleccionado.innerHTML = `Transferencia bancaria &nbsp;&nbsp;`
  }
})


const calle = document.getElementById('calle');
const numero = document.getElementById('numero');
const esquina= document.getElementById('esquina');

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        else {
          swal("Registrado con éxito");
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
