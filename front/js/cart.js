const cartDiv = document.getElementById("cart__items")
let shoppingCart = JSON.parse(localStorage.getItem("CART"))

for(let item of shoppingCart){
        
    cartDiv.innerHTML += 
        `<article class="cart__item" data-id=${item.id} data-color=${item.color} data-quantity =${item.quantity}>
        <div class="cart__item__img">
        <img src=${item.imageSrc} alt="Photographie d'un canapé"></img>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.color}</p>
            <p>${item.price}€</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : ${item.quantity} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.quantity}></input>
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>`
        
}


function deleteItem() {

    let btnDelete = document.querySelectorAll(".deleteItem");
    btnDelete.forEach((target) => {
        let article = target.closest("article");
        let id = article.dataset.id;
        let color = article.dataset.color;
        target.addEventListener("click" , () => {

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            shoppingCart = shoppingCart.filter((element) => element.id !== id || element.color !== color );

            // mise à jour du localstorage
            localStorage.setItem("CART", JSON.stringify(shoppingCart));
            
            //Alerte produit supprimé
            alert("Ce produit a bien été supprimé du panier");
            document.location.reload();
        })
    })
}

deleteItem()

