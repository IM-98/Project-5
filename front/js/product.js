// récupération de l'ID du produit dans l'url grâce à searchParams.get()
const productId = new URL(location.href).searchParams.get("id")
// création d'une URL dynamique pour les appels à l'API
const productInfo = `http://localhost:3000/api/products/${productId}`

const imgContainer = document.querySelector(".item__img")
const productTitle = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const selectColors = document.querySelector("select")

// création d'un tableau shoppingCart dans le local storage 
let shoppingCart = JSON.parse(localStorage.getItem("CART")) || [] 
const addProduct = document.getElementById("addToCart")

// requete GET à l'API qui retourne les informations d'un produit grace à son id
fetch(productInfo)
.then(res => res.json())
.then(product => {
    let imgProduct = document.createElement("img")
    imgProduct.src = product.imageUrl
    imgContainer.appendChild(imgProduct)
    
    productTitle.innerText = product.name

    productPrice.innerText = product.price
    
    productDescription.innerText = product.description

    // ajout des différentes couleurs dans l'élément select
    for(i=0; i<product.colors.length; i++){
        
        let productColorOption = document.createElement("option")
        productColorOption.value =  product.colors[i]
        productColorOption.innerText = product.colors[i]
        selectColors.appendChild(productColorOption)
    }
    
    addProduct.addEventListener("click",  e => addToCart())

    // fonction ajout d'un nouveau produit 
    function newProduct() {
        const productQuantitySelected = document.getElementById("quantity").value
        const productColorsSelected = document.getElementById("colors").value

        // création d'un objet produit qui contient les paramètres sélectionné par le client
        let productChoosen = {
            color :productColorsSelected,
            name : product.name,
            quantity : productQuantitySelected ,
            imageSrc : product.imageUrl,
            description : product.description,
            id : productId
        }
        // envoi du produit dans le local storage
        shoppingCart.push(productChoosen)
        //mise à jour local storage
        localStorage.setItem("CART", JSON.stringify(shoppingCart))


        console.log(shoppingCart)
    }

    function addToCart() {

        const productQuantitySelected = document.getElementById("quantity").value
        const productColorsSelected = document.getElementById("colors").value

        //vérification que le client a bien choisi une couleur et une quantité correcte
        if( productQuantitySelected >=1 && productQuantitySelected < 100 && productColorsSelected !== undefined &&  productColorsSelected !== "" ){

            // vérification si le panier est vide
            if(localStorage.getItem("CART")){

                let id = productId
                // verification qu'un produit de meme id meme couleur est présent dans le panier
                const checkCart = shoppingCart.find( (element) => element.id === id && element.color === productColorsSelected)

                // si meme id et meme couleur, alors on incrémente seulement la quantité
                if(checkCart){
                    console.log("resultfind kanap = " + checkCart.quantity)

                    let newQuantity = parseInt(productQuantitySelected) + parseInt(checkCart.quantity)
                    checkCart.quantity = newQuantity
                    localStorage.setItem("CART", JSON.stringify(shoppingCart))

                }
                // si couleur différente ou id différent alors on ajoute le produit comme un nouveau
                else {
                    newProduct()
                }

            } 
            //si le panier est vide, on peut ajouter un nouveau produit
            else {
            newProduct()
            }

        }
        // si les paramètres sont incorrectes, on informe le client
        else {
            alert("vous devez selectionner une couleur et une quantité")
        
        }
    }

})