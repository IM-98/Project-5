let shoppingCart = JSON.parse(localStorage.getItem("CART")) || []
const API = "http://localhost:3000/api/products"

// requete GET au backend qui nous renvoit la data des produits
async function getData() {
    const response = await fetch(API);
  
    const data =  response.json();

    return data
}

const cartDiv = document.getElementById("cart__items")

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

// fonction qui permet d'afficher le prix en provenance du backend

async function getPrice(){

    //récupération de la réponse du backend
     let data = await getData()  
        let dataOfCart = []

        for(i=0; i<data.length; i++){
            for(let item of shoppingCart){
                // on récupère uniquement les infos sur les articles présent dans le panier dans dataOfCart
                if(item.id === data[i]._id){ 
                    dataOfCart.push(data[i])
                }
            }
        }
        // on affiche le prix de chaque article grâce à son id
        const itemPrice = document.querySelectorAll(".itemPrice")
        for(i=0; i<itemPrice.length; i++){
            let id = itemPrice[i].closest("article").dataset.id
            if(id === dataOfCart[i]._id){
                itemPrice[i].innerText = dataOfCart[i].price + " €"
            }
        }
}

getPrice()

// fonction qui permet de calculer le prix total du panier et le nombre total d'article

async function getTotalPrice(){
    let data = await getData() 

        // délclaration des variables qui vont nous servir à stocker la data utile pour calculer le total
            let priceOfItem = []
            let qtyPerItem = []
            let numberOfProduct = 0
    
        // on récupère le prix de chaque article dans le panier grâce aux IDs 
            for(i=0; i<data.length; i++){
                for(let item of shoppingCart){
                    if(item.id === data[i]._id){
                        priceOfItem.push(data[i].price)
                    }
                }
            }
            //on incrémente le nombre total de produit et on récupère la quantité par article dans le tableau qtyPerItem
            for(let item of shoppingCart){
            numberOfProduct += parseInt(item.quantity)
            qtyPerItem.push(parseInt(item.quantity)) 
            }
        
            // on multiplie les tableaux qtyPerItem et priceOfItem puis additionne le résultat pour obtenir le prix total , grâce à la méthode .reduce()
            const totalPriceOfCart = qtyPerItem.reduce((somme, qtyT, index) => somme + (qtyT * priceOfItem[index]), 0)
    
            totalQuantity.innerText = numberOfProduct
            totalPrice.innerText = totalPriceOfCart
}
getTotalPrice()

// fonction suppression d'un article 

function deleteItem() {

    let btnDelete = document.querySelectorAll(".deleteItem");
    btnDelete.forEach((target) => {
        let article = target.closest("article");
        let id = article.dataset.id;
        let color = article.dataset.color;
        target.addEventListener("click" , () => {

            //Selection de l'element à supprimer grace à la méthode filter
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

// fonction mise à jour de la quantité d'un produit + mise à jour du total

function updateQuantityOfItem() {
// ajout d'un EventListener sur chaque input de quantité 
    let updateQuantity = document.querySelectorAll(".itemQuantity")
    updateQuantity.forEach(element => {
        let article = element.closest("article")
        let id = article.dataset.id
        let color = article.dataset.color
        let qty = article.dataset.quantity
        element.addEventListener( "change", (input)=> {
            
            for(let item of shoppingCart){
                //actualisation de la quantité du produit grâce à la valeur de l'input
                if(item.id === id && item.color === color){
                    
                    item.quantity = input.target.value
                    qty = input.target.value
                    // mise à jour du local storage
                    localStorage.setItem("CART", JSON.stringify(shoppingCart))
                    //appel de la fonction getTotalPrice pour mettre à jour le total
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


// création d'un tableau customer info dans le local storage
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
        // création d'un objet contact qui contient les coordonnées du client
        let contact = {
            email : email.value,
            firstName : first.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value
        }
        // envoi de l'objet contact dans le local storage puis on met à jour
        storedCustomerInfo.push(contact)
        localStorage.setItem("Customer Info", JSON.stringify(storedCustomerInfo))

        // récupération des ids des produits commandés
        let products = []

        for(item of shoppingCart){
            products.push(item.id)
        }

        // création d'un objet coordonnées + id des produits à envoyer au backend
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
        
        //envoi de la commande au backend avec POST qui nous retourne un order ID + redirection du client vers la page confirmation
    
        fetch("http://localhost:3000/api/products/order", options)
            .then(response => response.json())
            .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
            })
    }
})