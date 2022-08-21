const URL= 'https://japceibal.github.io/emercado-api/cats_products/101.json';


function getHTML(product) {
    return `
    <div class="row shadow p-0 rounded overflow-hiden mb-3" data-id="${product.id}">
        <div class="col-3 p-0">
            <img class="img-fluid"src="${product.image}" alt="">
        </div>
        <div class="col-9 d-flex flex-column justify-content-between">
            <div class="productBody">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
            <div class="productFooter d-flex justify-content-between">
                <p>Cantidad de vendidos: <span class="cantidad">${product.soldCount}</span></p>
                <div class="precio">
                    <span class="moneda">${product.currency}</span>
                    <span class="precio">${product.cost}</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', async function(){
    const listado= document.querySelector('.product-list');

    const listadoAutos= await getJSONData(URL);

    listadoAutos.data.products.forEach(function (auto){
        listado.innerHTML += getHTML(auto)
    }) 

});