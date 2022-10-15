const CARTURL ="https://japceibal.github.io/emercado-api/user_cart/25801.json";

document.addEventListener('DOMContentLoaded', async function(){
    const listado= document.getElementById('infoCart');
    const listadoInfoCart= await getJSONData(CARTURL);

    listadoInfoCart.data.articles.forEach(function(cart){
        listado.innerHTML += getHTML(cart)
    }) 
});

function getHTML(cart) {
    return `<tr>
    <th scope="row"><img class="img-fluid" width="60" height="60"src="${cart.image}" alt=""></th>
    <td><p>${cart.name}</p></td>
    <td>${cart.currency} ${cart.unitCost}</td> 
    <td><input id="cantidad" type="number" min="1" max="100" value="${cart.count}" oninput="subTotal(${cart.unitCost})"></td>
    <td ><strong> ${cart.currency}<span id="multiplicacion">  ${cart.unitCost * cart.count}</span></strong></td>
    </tr>`;
};
    

function subTotal(precio) {
    const cantidadCart = document.getElementById('cantidad').value
    const multiplicacionCart = document.getElementById('multiplicacion')
    multiplicacionCart.innerHTML = cantidadCart * precio
}