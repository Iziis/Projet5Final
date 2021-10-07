// fetch pour récupérer les données relatives aux produits depuis l'API

fetch ('http://localhost:3000/api/products')

    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    // affichage de l'ensemble des produits grâce aux paramètres récupérés dans l'API

    .then(function(resJson) { 
        resJson.forEach(item => {
            const DIV = document.getElementById('items');
            DIV.innerHTML +=
             `
            <a href="./product.html?_id=${item._id}"> 
                <article class="card">
                    <h3 class="card-title">${item.name}</h3>
                    <img class="card-img-top" src="${item.imageUrl}" alt="${item.altTxt}"/>
                    <div class="card-body">
                        <p class="card-text">${item.description}</p>
                    </div>
                </article>
            </a>
                    `;
        })
    })

    .catch((erreur) => console.log("erreur : " + erreur)); // en cas d'erreur, l'erreur est affichée dans la console

