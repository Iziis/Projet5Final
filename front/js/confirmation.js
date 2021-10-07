// récupération des données du localStorage 

const basketArray = new Map();

for (let i = 0; i < localStorage.length; i++ ) {

    if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('form')) {
    const sofa =JSON.parse (localStorage.getItem(localStorage.key(i)))
    basketArray.set(sofa.name +' '+ sofa.colors, sofa) // sofa ???
    }
}

console.log(basketArray)

// rappel de contact 

let contact = JSON.parse(localStorage.getItem('form'));
console.log(contact)

// récupérer les id du ou des produits mis dans le panier 

let products = [];

for ([key, value] of basketArray) {
    if(value.id != undefined) {
        products.push(value.id)
    }
};

console.log(products)

// fetch pour POST les données dans l'API et obtenir l'orderId

fetch ('http://localhost:3000/api/products/order', {

method : 'POST',

headers : {
    'Content-Type' : 'application/json',
},

body : JSON.stringify({contact : contact, products : products})

})

.then (function(res) {
    const contenu = res.json();
    contenu.then (function(resolve) {
        console.log(resolve)
        document.getElementById('orderId').innerHTML = resolve.orderId;
    })
})

.catch((erreur) => console.log("erreur : " + erreur)); // en cas d'erreur, l'erreur est affichée dans la console