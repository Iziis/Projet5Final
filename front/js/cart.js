// récupérer les données du localStorage 

const basketArray = new Map();

for (let i = 0; i < localStorage.length; i++ ) {

    if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('formulaire')) {
    const sofa =JSON.parse (localStorage.getItem(localStorage.key(i)))
    basketArray.set(sofa.name +' '+ sofa.colors, sofa) // sofa ???
    }
}

console.log(basketArray)

// affichage des éléments saved dans le localStorage au niveau du panier 

const PANIER = document.getElementById('cart__items');

for ([key, value] of basketArray) {

    let produitPanier =
    `
        <article class="cart__item" data-id="{product-ID}">
            <div class="cart__item__img">
                <img class="cart__item__img__sofa" src="${value.img}" alt="Photographie d'un canapé"/>
            </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${value.name}</h2>
                        <p>${value.colors}</p>
                        <p>${value.price} €</p>
                    </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${value.quantity}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${value.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <button class="remove" href="panier.html">Supprimer</button>
                            </div>
                        </div>
                </div>
        </article> `

    PANIER.innerHTML += produitPanier
}

// supprimer un élément du panier 

let remove = document.querySelectorAll('.remove');
console.log(remove)

for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', function(e) {
        let removeLocalStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
        localStorage.removeItem(removeLocalStorage.name + ' ' + removeLocalStorage.colors);
    })
}

// calcul prix total

let total = 0;
    
for ([key,value] of basketArray) {
     total = total + parseFloat(value.price)
};

console.log(total)

// afficher prix total 

const totalBasket = document.getElementById("totalBasket");
totalBasket.innerHTML += total;

// calcul nombre total d'articles 

let totalQuantity = 0;
for([key, value] of basketArray) {
    totalQuantity = totalQuantity + parseFloat(value.quantity)
}

console.log(totalQuantity)

// afficher nombre total d'articles 

const totalArticles = document.getElementById('totalQuantity');
totalArticles.innerHTML += totalQuantity;


// localStorage.clear();


// faire en sorte que le prix total change si l'on modifie la quantité d'un article depuis le panier 

// on doit pouvoir modifier la quantité stockée dans le localStorage depuis le panier (value.quantity value.price)

// faire en sorte de pas être obligé de reload pour voir le panier actualisé quand on delete

// faire en sorte de pouvoir delete uniquement la quantité qu'il faut et non pas tous les produits (genre delete 1 canap sur les 3, et non pas les 3 d'un coup)
// suite : faire en sorte que la fonction remove prenne en compte la quantité

// clear tous les éléments du panier 

/* const CLEAR = document.getElementById('clear');
CLEAR.addEventListener('click', function(e) {
    localStorage.clear(); 
}) 
} */