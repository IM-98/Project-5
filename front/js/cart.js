const cartDiv = document.getElementById("cart__items")
let shoppingCart = JSON.parse(localStorage.getItem("CART")) || []

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

function getTotalQuantity(){

    const totalQuantity = document.getElementById("totalQuantity")
    const totalPrice = document.getElementById("totalPrice")

    let qtyPerItem = []
    let priceOfItem = []
    let numberOfProduct = 0

    for( let item of shoppingCart){
        numberOfProduct += parseInt(item.quantity)
        qtyPerItem.push(parseInt(item.quantity)) 
        priceOfItem.push(item.price) 
    }

    const totalPriceOfCart = qtyPerItem.reduce((somme, qtyT, index) => somme + (qtyT * priceOfItem[index]), 0)

    totalQuantity.innerText = numberOfProduct
    totalPrice.innerText = totalPriceOfCart
}

getTotalQuantity()


function updateQuantityOfItem() {
let updateQuantity = document.querySelectorAll(".itemQuantity")
updateQuantity.forEach(element => {
    let article = element.closest("article")
    let id = article.dataset.id
    let color = article.dataset.color
    let qty = article.dataset.quantity
    element.addEventListener( "change", (input)=> {
        
        for(let item of shoppingCart){

            if(item.id === id && item.color === color){
                
                item.quantity = input.target.value
                qty = input.target.value
                
                localStorage.setItem("CART", JSON.stringify(shoppingCart))
                getTotalQuantity()
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
    if (shoppingCart = []) {
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



