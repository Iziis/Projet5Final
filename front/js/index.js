// fetch 

fetch ('http://localhost:3000/api/products')

    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })

    .then(function(resJson) {
        resJson.forEach(item => {
            const DIV = document.getElementById('items');
            DIV.innerHTML +=
             `
            <a href="./product.html?_id=${item._id}"> 
                <article class="card">
                    <h3 class="card-title">${item.name}</h3>
                    <img class="card-img-top" src="${item.imageUrl}"/>
                    <div class="card-body">
                        <p class="card-text">${item.description}</p>
                    </div>
                </article>
            </a>
                    `;
        })
    });

