let productId = localStorage.getItem('id')
let listadoProductosinfo = [];

document.addEventListener('DOMContentLoaded', async function () {

    var listado = await getJSONData(PRODUCT_INFO_URL + productId + EXT_TYPE);
    
    listadoProductosinfo = listado

    document.getElementById("product-info").innerHTML = showProductsinfoList(listado.data);

    document.getElementById("product-related").innerHTML = showProductsRelatedList(listado.data.relatedProducts);
});

function showProductsinfoList(productsinfo) {

    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="row col-6 line-height:0">
            <h3 class="card-title"> ${productsinfo.name}</h3>
            <p class="card-text"><b>Precio:</b> ${productsinfo.currency} ${productsinfo.cost}</p>
            <p class="card-text"><b>Descripción:</b> ${productsinfo.description}</p>
            <p class="card-text"><b>Categoría:</b> ${productsinfo.category}</p>
            <p class="card-text"><span class="cantidad"><b>Cantidad de vendidos:</b> ${productsinfo.soldCount}</span></p>
        </div> 
        <div class="row col-6">
            <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="${productsinfo.images[0]}" class="d-block w-60" alt="...">
                </div>
                <div class="carousel-item">
                <img src="${productsinfo.images[1]}" class="d-block w-60" alt="...">
                </div>
                <div class="carousel-item">
                <img src="${productsinfo.images[2]}" class="d-block w-60" alt="...">
                </div>
                <div class="carousel-item">
                <img src="${productsinfo.images[3]}" class="d-block w-60" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div> `
    return htmlContentToAppend
}

const comentarioProduct = document.querySelector('.product-comentario');
let comentarioProducts = [];

document.addEventListener('DOMContentLoaded', async function () {

    var listadocomentario = await getJSONData(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE);

    comentarioProducts = listadocomentario

    console.log(listadocomentario.data)

    document.getElementById("product-comentario").innerHTML = showProductscomentario(listadocomentario.data);
});

function showProductscomentario(productscom) {

    let htmlContentToAppend = "";

    for (let i = 0; i < productscom.length; i++) {
        const element = productscom[i];

        htmlContentToAppend += `
        <div class="card col-10 d-flex d-flex justify-content-center" >
            <div class="card-body">
            <p class="card-text"><b>${element.user} </b></p>
            <p class="card-text">${showStars(element.score)}</p>
            <p class="card-text">${element.description}</p>
            <p class="card-text">${element.dateTime}</p>
            </div>
        </div> `

    }
    return htmlContentToAppend
}

const starFull = '<span class="fa fa-star checked"></span>';
const starEmpty = '<span class="fa fa-star"></span>';

function showStars(puntaje) {

    let completos = puntaje
    let estrellas = ''

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

function setProdID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html"
}

function showProductsRelatedList(productsinfo) {

    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="container row col-6">
            <div class="row col-1 card-body" onclick="setProdID(${productsinfo[0].id})">
                <h5 class="card-title"> ${productsinfo[0].name}</h5>
                <img src="${productsinfo[0].image}" alt="...">
            </div> 
            <div class="row col-1 card-body" onclick="setProdID(${productsinfo[1].id})">
                <h5 class="card-title"> ${productsinfo[1].name}</h5>
                <img src="${productsinfo[1].image}" alt="...">
            </div>
        </div>`
    return htmlContentToAppend
}