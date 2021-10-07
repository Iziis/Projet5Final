// récupération de l'id du produit

let id = window.location.search.substr(5); // pour soustraire ?_id= et obtenir seulement l'id

console.log(window.location);

console.log(id);

// modification de l'adresse d'appel à l'API

let url = 'http://localhost:3000/api/products/' + id;

console.log(url);

// fetch

fetch (url)

    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then((data) => {

        const product = data;
        console.log(product);

        // affichage des détails du produit dans la section ayant pour id #items

        const DIV = document.getElementById('items');
        DIV.innerHTML +=

        `
        <article>
            <div class="item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}"/>  
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${product.name}</h1>
                <p>Prix : <span id="price">${product.price} €</span></p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${product.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une taille :</label>
                  <select name="color-select" id="colors">
                      
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart" href="cart.html">Ajouter au panier</button>
              </div>

            </div>
          </article>
          `

        // ajout des choix de coloris au menu déroulant

        const select = document.getElementById('colors');
        let tab = product.colors;
        for(color of tab){
            let option = document.createElement('option');
            option.innerHTML = color;
            select.appendChild(option)
        }

        // préparation du panier 

        const sofa = new Map ()

        // nom

        const nom = product.name;
        sofa.set ('name', nom)

        // image

        const img = product.imageUrl;
        sofa.set ('imageUrl', img)

        // texte alternatif de l'image 

        const alt = product.altTxt;
        sofa.set ('altTxt', alt)

        // couleur // 
    
        const colorChoice = document.getElementById("colors");
        let colorsValue = colorChoice.value;
        sofa.set ('colors', colorsValue)

        // quand une couleur différente de celle par défaut est choisie

        colorChoice.addEventListener('change', function(e) {
            colorsValue = colorChoice.value;
            sofa.set ('colors', colorsValue)
        });

        // quantité 

        const quantity = document.getElementById("quantity");
        let quantityValue = parseFloat(quantity.value);
        sofa.set ('quantity', quantityValue)

        // prix 
        const price = product.price;
        let totalPrice = parseFloat(price);
        sofa.set('price', totalPrice)

        // quand une quantité > 1 est choisie 

        quantity.addEventListener('change', function(e) {
            quantityValue = parseFloat(quantity.value);
            sofa.set('quantity', quantityValue);
            totalPrice = parseFloat(price) * parseFloat(quantityValue);
            sofa.set('price', totalPrice);
        });

        // opérations au niveau du panier 

        const basket = new Map ();

        const btnAddBasket = document.getElementById("addToCart");

        // lorsque l'on clique sur le bouton "Ajouter au panier"

        btnAddBasket.addEventListener("click", function(e) {

            e.preventDefault();

            function addToCart(data) {

                const productObject = {
                    name : sofa.get('name'),
                    img : sofa.get('imageUrl'),
                    alt : sofa.get('altTxt'),
                    colors : sofa.get('colors'),
                    quantity : sofa.get('quantity'),
                    price : sofa.get('price'),
                    id : id 
                };

                const clé =  `${data.name}` + ' ' + productObject.colors;
                const canape = JSON.parse(localStorage.getItem(clé));

                if (canape === null) {
                    basket.set(clé, productObject);
                    for ([key, value] of basket) {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                }

                else {

                    const defaultQuantity = parseFloat(canape.quantity);
                    const newQuantity = defaultQuantity + productObject.quantity

                    const defaultPrice = parseFloat(canape.price);
                    const newPrice = defaultPrice + productObject.price

                    const newProductObject = {

                        name : sofa.get('name'),
                        img : sofa.get('imageUrl'),
                        alt : sofa.get('altTxt'),
                        colors : sofa.get('colors'),
                        quantity : newQuantity,
                        price : newPrice,
                        id : id
                    }

                    localStorage.setItem(clé, JSON.stringify(newProductObject));
                }  
            };

            addToCart(data);

           console.log(localStorage)
    
        }); 

    })

    .catch((erreur) => console.log("erreur : " + erreur)); // en cas d'erreur, l'erreur est affichée dans la console