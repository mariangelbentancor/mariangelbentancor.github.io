const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const usuarioNav = document.getElementById('usuario');
var getClaveUsuario = localStorage.getItem('mail');

if (getClaveUsuario !== null){
usuarioNav.innerHTML += `<a class="nav-item" href"">${getClaveUsuario}</a>`;
}

const dropdownCarrito= document.getElementById('carrito');
const dropdownPerfil= document.getElementById('perfil');
const dropdownCerrar = document.getElementById('cerrar');

dropdownCarrito.addEventListener ('click',() => {
  window.location = "cart.html"
})

dropdownPerfil.addEventListener ('click',() => {
  window.location = "my-profile.html"
})

dropdownCerrar.addEventListener ('click',() => {
  window.location = "index.html"
  localStorage.removeItem("mail");
})