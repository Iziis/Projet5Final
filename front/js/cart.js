// récupération des données du localStorage 

const basketArray = new Map();

for (let i = 0; i < localStorage.length; i++ ) {

    if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('form')) {
        const sofa = JSON.parse (localStorage.getItem(localStorage.key(i)))
        basketArray.set(sofa.name +' '+ sofa.colors, sofa) // exemple : récupère Canapé (sofa.name) Orthésie (sofa.colors) + tous les éléments liés à ce produit (quantité, prix, nom, description, orderId, etc..)
    }
}

console.log(basketArray)

// initialisation pour mettre les produits dans le tableau récapitulatif

const PANIER = document.getElementById('cart__items');

// si le panier est vide, affichage d'un message à destination de l'utilisateur

if (basketArray.size < 1) {
    let emptyBasket = document.createElement('p')
    emptyBasket.style = ('text-align:center'); 
    emptyBasket.innerText = 'Attention votre panier est vide !'
    PANIER.appendChild(emptyBasket)
}

// si le panier n'est pas vide -> affichage des éléments stockés dans le localStorage

else {

    for ([key, value] of basketArray) {

        let produitPanier =
        `
            <article class="cart__item" data-id="${key}"> 
                <div class="cart__item__img">
                    <img class="cart__item__img__sofa" src="${value.img}" alt="${value.alt}"/>
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
                                    <input type="number" id="newQuantity" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${value.quantity}"><button class="modify">Modifier</button>
                                    
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <button class="remove" onClick="window.location.reload();">Supprimer</button>
                                </div>
                            </div>
                    </div>
            </article> `
    
        PANIER.innerHTML += produitPanier
    }
}

// suppression d'un élément du panier 

let remove = document.querySelectorAll('.remove'); // on sélectionne tous les boutons ayant pour classe .remove

for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', function(e) {
        let removeLocalStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
        localStorage.removeItem(removeLocalStorage.name + ' ' + removeLocalStorage.colors);
    })
}
 
// quand la quantité est modifiée depuis le panier 

let quantityChange = new Map();

for (let i = 0; i < basketArray.size; i++) {

    // on sélectionne tous les boutons ayant pour classe .modify
    let modify = document.querySelectorAll('.modify') 

    // on sélectionne l'input voisin (sibling) du bouton "modifier"
    let input = modify[i].previousSibling;
    console.log(input)

    // on initialise la valeur de départ de l'input
    let elementAdd = input.value;
    console.log(elementAdd)

    // on initialise le nom de la valeur à set dans la map quantityChange (exemple : "quantity : 2")
    let name = "quantity " + [i];
    console.log(name)

    // on set les valeurs de base de quantityChange
    quantityChange.set(name, elementAdd)

    // on prend la valeur de l'input changé
    input.addEventListener('change', function(e) {
        elementAdd = input.value;
        console.log(elementAdd)
        quantityChange.set(name, elementAdd);
        console.log(quantityChange) 
    })

    modify[i].addEventListener('click', function(e) {

        // on récupère le produit (canapé) lié au bouton (modifier) 
        let sofa = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(sofa)

        // on récupère la nouvelle valeur de l'input  
        let newQuantity = parseFloat(quantityChange.get(name));

        // on récupère la valeur input initiale dans localStorage
        let initialQuantity = parseFloat(sofa.quantity)
        console.log(initialQuantity)
        console.log(typeof initialQuantity)

        // on set 1 nouvel item dans le localStorage, avec les valeurs mises à jour si différentes des valeurs initiales

        if (newQuantity !== initialQuantity) {

            let newSofa = {
                name : sofa.name,
                img : sofa.img,
                alt : sofa.alt,
                colors : sofa.colors,
                quantity : newQuantity,
                price : (parseFloat(sofa.price)/initialQuantity) * newQuantity
            }

            localStorage.setItem(sofa.name + ' ' + sofa.colors, JSON.stringify(newSofa));
            window.location.reload();

            console.log(newSofa)
        }

        else {
            e.preventDefault();
            alert("Vous possédez déjà cette quantité dans votre panier")
        }

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

// clear tous les éléments du panier 

let clear = document.getElementById('clear');
clear.addEventListener('click', function(e) {
    localStorage.clear(); 
})

// Fonction pour stocker les données renseignées dans le formulaire dans une map

const form = new Map ()

function onChange(id) {
    let element = document.getElementById(id);
    let elementAdd = element.value;
    element.addEventListener('change', function(e) {
        elementAdd = element.value;
        form.set(id, elementAdd)
    })
};

onChange('firstName');
onChange('lastName');
onChange('address');
onChange('city');
onChange('email');

// expressions régulières pour vérifier la validité des champs des formulaires

let regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/; // autorise lettres sans caractères spéciaux et/ou numériques hormis '-'
let regexCity = /^(([a-zA-Z0-9-]+[\s\-][a-zA-ZÀ-ÿ-]+))$/; // autorise chiffres pour code postal, et lettres et tirets pour la ville
let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/; // autorise . _ et - comme caractères spéciaux, un @ est obligatoirement requis
let regexAddress = /^([a-zA-Z0-9-]+[\s\-][a-zA-ZÀ-ÿ-]+[\s\-][a-zA-ZÀ-ÿ-]+[\s\-][a-zA-ZÀ-ÿ-]+)$/; // autorise chiffres pour numéro de voie, lettres et - pour type de voie et adresse complète

// fonction pour vérifier les inputs 

function errorInput(id, message, check, firstName) {

    let element = document.getElementById(id);

    if (check.test(firstName) == false){
        element.innerText = message;
        element.classList.add('text-danger');
        element.classList.remove('d-none')
    }
    else {
        element.classList.add('d-none');
        element.remove('text-danger');
    }
}

// affichage de messages d'erreurs en cas d'inputs non correctement renseignés

let lastName = document.getElementById('lastName');
lastName.onchange = function () {errorInput('lastNameErrorMsg', 'Veuillez vérifier les informations concernant votre nom de famille. Les caractères numériques et les caractères spéciaux autres que " - " ne sont pas autorisés.', regexName, lastName.value)};

let firstName = document.getElementById('firstName');
firstName.onchange = function () {errorInput('firstNameErrorMsg', 'Veuillez vérifier les informations renseignées concernant votre prénom. Les caractères numériques et les caractères spéciaux autres que " - " ne sont pas autorisés.', regexName, firstName.value)};

let city = document.getElementById('city');
city.onchange = function () {errorInput('cityErrorMsg', 'Veuillez vérifier les informations concernant votre ville et son code postal. Les caractères spéciaux autres que " - " ne sont pas autorisés.', regexCity, city.value)};

let address = document.getElementById('address');
address.onchange = function() {errorInput('addressErrorMsg', 'Veuillez vérifier les informations concernant votre adresse. Les caractères autres que "," et "-" ne sont pas autorisés.', regexAddress, address.value)};

let mail = document.getElementById('email');
mail.onchange = function() {errorInput('emailErrorMsg', 'Veuillez vérifier les informations concernant votre adresse e-mail. Votre adresse doit comporter un @. Les caractères spéciaux autres que "." "_" et "-" ne sont pas autorisés.', regexMail, email.value)};

// Lorsque que l'on clique sur le bouton "commander"

let order = document.getElementById('order');

if (basketArray.size < 1) { // si le panier est vide

    order.addEventListener('click', function(e) {
        e.preventDefault()
        alert('Attention, votre panier est vide.')
    }) 
}

else { // si le panier comporte au moins un produit 

    order.addEventListener('click', function(e) {

        contact = {

            firstName : form.get('firstName'),
            lastName : form.get('lastName'),
            address : form.get('address'),
            city : form.get('city'),
            email : form.get('email'),
        }
    
        console.log(contact)
        e.preventDefault(); // empêcher le renvoi vers la page confirmation.html tant que les vérifications d'input ne sont pas faites

        if ( // vérification des inputs par comparaison entre les valeurs entrées par l'utilisateur et les regex définies précédemment

            (regexName.test(contact.firstName) == false) || 
            (regexName.test(contact.lastName) == false) || 
            (regexAddress.test(contact.address) == false) ||
            (regexCity.test(contact.city) == false) ||
            (regexMail.test(contact.email) == false)  
    
            ){
                e.preventDefault() // empêcher le renvoi vers la page confirmation.html tant que les valeurs renseignées dans les inputs ne sont pas valides

                alert('Les informations que vous venez de renseigner sont invalides, veuillez compléter les champs requis.')
            }
            
        else { // si la vérification des inputs s'est bien déroulée, on set les données dans le localStorage

            localStorage.setItem('form', JSON.stringify(contact));
            console.log(localStorage)
            window.location = 'confirmation.html';

        }
    })
}