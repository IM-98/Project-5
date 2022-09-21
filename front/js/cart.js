const cartDiv = document.getElementById("cart__items")
const API = "http://localhost:3000/api/products"
let shoppingCart = JSON.parse(localStorage.getItem("CART")) || []

// on itère à travers le panier stocké dans le local storage pour créer les élements HTML nécessaire à l'affichage des produits

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
            <p class="itemPrice">€</p>
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


// fonction qui permet d'insérer le prix pour chaque article

async function getPrice(){
    // requete GET à l'api pour obtenir les infos sur les produits
    fetch(API)
    .then(res => res.json())
    .then(data => {
        
        for(i=0; i<data.length; i++){
            for(let item of shoppingCart){
                // on récupère puis affiche le prix des articles du panier grâce à leur id
                if(item.id === data[i]._id){
                    let priceItem =  data[i].price
                    const itemPrice = document.querySelectorAll(".itemPrice")
                    itemPrice.forEach(element => element.innerText = priceItem + "€")
                }
            }
        }
    
    })
}

getPrice()

// fonction qui permet de supprimer un article du panier

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

// fonction qui permet d'afficher le nombre total d'articles et le prix total du panier

async function getTotPrice(){
// on fait un appel à l'api pour avoir toutes les infos des produits
    fetch(API)
    .then(res => res.json())
    .then(data => {
    // ondéclare des variables qui vont nous servir à stocker la data utile pour calculer le total
        let priceOfItem = []
        let qtyPerItem = []
        let numberOfProduct = 0

    // on récupère le prix de chaque article présent dans le panier grâce aux IDs présent dans le panier
        for(i=0; i<data.length; i++){
            for(let item of shoppingCart){
                if(item.id === data[i]._id){
                    priceOfItem.push(data[i].price)
                }
            }
        }
        //on incrémente le nombre total de produit et on récupère la quantité par article qu'on ajoute dans le tableau qtyPerItem
        for(let item of shoppingCart){
        numberOfProduct += parseInt(item.quantity)
        qtyPerItem.push(parseInt(item.quantity)) 
        }
    
        // on multiplie les tableaux qtyPerItem et priceOfItem puis additionne le résultat pour obtenir le prix total , grâce à la méthode .reduce()
        const totalPriceOfCart = qtyPerItem.reduce((somme, qtyT, index) => somme + (qtyT * priceOfItem[index]), 0)

        totalQuantity.innerText = numberOfProduct
        totalPrice.innerText = totalPriceOfCart
    })
}

getTotPrice()

// fonction qui met à jour la quantité d'un article dans le panier et ensuite le prix total du panier

function updateQuantityOfItem() {
// on applique un addEventListener sur chaque input de quantité 
    let updateQuantity = document.querySelectorAll(".itemQuantity")
    updateQuantity.forEach(element => {
        let article = element.closest("article")
        let id = article.dataset.id
        let color = article.dataset.color
        let qty = article.dataset.quantity
        element.addEventListener( "change", (input)=> {
            
            for(let item of shoppingCart){
                //si le produit dont la quantité a été modifié est similaire au produit présent dans le panier on incrémente sa quantité
                if(item.id === id && item.color === color){
                    
                    item.quantity = input.target.value
                    qty = input.target.value
                    // on met à jour le local storage
                    localStorage.setItem("CART", JSON.stringify(shoppingCart))
                    // on appel la fonction getTotalPrice pour afficher le total panier à jour
                    getTotPrice()
                    location.reload()
                }
            }
        })
    })
}

updateQuantityOfItem()


// FORM VALIDATION



const regExMail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i

const regExLetters = /^[a-zA-ZÀ-ÿ-. ]*$/

const regExLettersNumbers = /^[a-zA-ZÀ-ÿ0-9-. ]*$/  

let email = document.getElementById("email")
let first = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")

city.classList.add("regExLetters")
first.classList.add("regExLetters")
lastName.classList.add("regExLetters")

let addressError = document.getElementById("addressErrorMsg")
let emailError = document.getElementById("emailErrorMsg")
const wrongInput = "champ incorrecte"

email.addEventListener('change', checkEmail)
address.addEventListener('change',checkAddress)


//vérification des champs du formulaires grâce au regular expression

function checkEmail(e) {
    if(regExMail.test(e.target.value)) {
        emailError.innerText = ""
      }
      else {
          emailError.innerText = wrongInput
          emailError.style.color = "red"
      } 
  
}

const checkLetters = document.querySelectorAll(".regExLetters")

checkLetters.forEach((element)=>{


    element.addEventListener("change",(e) => {
        let errorMsg = e.target.nextElementSibling
        if(regExLetters.test(e.target.value)) {
            errorMsg.innerText = ""
        }
        else {
            errorMsg.innerText = wrongInput
            errorMsg.style.color = "red"
        } 
    })

})



function checkAddress(e) {
    if(regExLettersNumbers.test(e.target.value)) {
        addressError.innerText = ""
      }
      else {
          addressError.innerText = wrongInput
          addressError.style.color = "red"
      } 
  
}

console.log(shoppingCart)


const storedCustomerInfo = JSON.parse(localStorage.getItem("Customer Info")) || [] 
const submit = document.getElementById("order")
submit.addEventListener('click', event => {
    event.preventDefault()
    if (shoppingCart == "") {
        alert("Pour passer commande, veuillez ajouter des produits à votre panier");
        
    } else if (first.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
        alert("Vous devez renseigner vos coordonnées pour passer la commande !");
    
    } else if (regExLetters.test(first.value) ==  false || regExLetters.test(lastName.value) ==  false || regExLettersNumbers.test(address.value) ==  false || regExLetters.test(city.value) ==  false || regExMail.test(email.value) ==  false) {
        alert("Vérifiez vos coordonnées pour passer commande !");
        
    } else {
        let contact = {
            email : email.value,
            firstName : first.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value
        }
        
        storedCustomerInfo.push(contact)
        localStorage.setItem("Customer Info", JSON.stringify(storedCustomerInfo))

        let products = []

        for(item of shoppingCart){
            products.push(item.id)
        }

        const sendFormData = {
            contact,
            products,
        }
    
        const options = {
            method: 'POST',
            body: JSON.stringify(sendFormData),
            headers: { 
            'Content-Type': 'application/json',
            }
        }
    
        fetch("http://localhost:3000/api/products/order", options)
            .then(response => response.json())
            .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
            })
    }
})