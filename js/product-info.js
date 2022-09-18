let productId = localStorage.getItem('id')
let listadoProductosinfo = [];
const listadoProduct = document.querySelector('.product-info');

document.addEventListener('DOMContentLoaded', async function () {

    var listado = await getJSONData(PRODUCT_INFO_URL + productId + EXT_TYPE);
 
    listadoProductosinfo = listado

    document.getElementById("product-info").innerHTML =  showProductsinfoList(listado.data);
   
});


function showProductsinfoList(productsinfo) {

    let htmlContentToAppend = "";
   
        htmlContentToAppend += `
        <div class="card-body">
            <h3 class="card-title"> ${productsinfo.name}</h3>
            <hr>
            <p class="card-text"><b>Precio:</b> ${productsinfo.currency} ${productsinfo.cost}</p>
            <p class="card-text"><b>Descripción:</b> ${productsinfo.description}</p>
            <p class="card-text"><b>Categoría:</b> ${productsinfo.category}</p>
            <p><span class="cantidad"><b>Cantidad de vendidos:</b> ${productsinfo.soldCount}</span></p>
            <br>
            <p><b>Imágenes ilustrativas</b></p>
            <div class="col-3 d-flex">
                <img src="${productsinfo.images[0]}" class="img-thumbnail" alt="...">
                <img src="${productsinfo.images[1]}" class="img-thumbnail" alt="...">
                <img src="${productsinfo.images[2]}" class="img-thumbnail" alt="...">
                <img src="${productsinfo.images[3]}" class="img-thumbnail" alt="...">
            </div>
        </div> `
return htmlContentToAppend
  
}

const comentarioProduct = document.querySelector('.product-comentario');
let comentarioProducts = [];

document.addEventListener('DOMContentLoaded', async function () {

    var listadocomentario = await getJSONData(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE);
 
    comentarioProducts = listadocomentario

    console.log (listadocomentario.data)

    document.getElementById("product-comentario").innerHTML =  showProductscomentario(listadocomentario.data);  
});

function showProductscomentario(productscom) {

    let htmlContentToAppend = "";
   
    for (let i = 0; i < productscom.length; i++) {
        const element = productscom[i];

        htmlContentToAppend += `
        <div class="card col-10 d-flex" >
            <div class="card-body">
            <p class="card-text"><b>${element.user} </b></p>
            <p class="card-text">${showStars (element.score)}</p>
            <p class="card-text">${element.description}</p>
            <p class="card-text">${element.dateTime}</p>
            </div>
        </div> `
        
    }    
return htmlContentToAppend
}

const starFull = '<span class="fa fa-star checked"></span>';
const starEmpty = '<span class="fa fa-star"></span>';

function showStars (puntaje) {

    let completos = puntaje
    let estrellas =''

    for (let i = 0; i < completos; i++) {
    estrellas += starFull        
    }

    if (completos < 5) {
        for (let i = completos; i < 5; i++) {
            estrellas += starEmpty       
        }   
    } 
    return estrellas
}