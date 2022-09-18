let categoriaId = localStorage.getItem ('catID')
let listadoProductos = [];
const listado= document.querySelector('.product-list');

document.addEventListener('DOMContentLoaded', async function(){

    var listado= await getJSONData (PRODUCTS_URL+ categoriaId + EXT_TYPE);

    listadoProductos = listado

    showProductsList (listadoProductos.data.products)

});

function setProdID(id) {
    localStorage.setItem("id", id);
    window.location = "product-info.html"
}

const ORDER_ASC_BY_COST = "AZ COST";
const ORDER_DESC_BY_COST = "ZA COST";
const ORDER_BY_PROD_SOLDCOUNT = "Cant vendida";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="row shadow p-0 rounded overflow-hiden mb-3" onclick="setProdID(${product.id})">
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
        </div>`
        }

        listado.innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria){
    currentSortCriteria = sortCriteria;
 
    array = sortProducts(currentSortCriteria, listadoProductos.data.products);

    //Muestro las categorías ordenadas
    showProductsList(array);
}

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(listadoProductos.data.products);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(listadoProductos.data.products);
    });