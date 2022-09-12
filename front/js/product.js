const productId = new URL(location.href).searchParams.get("id");
const productInfo = `http://localhost:3000/api/products/${productId}`

const imgContainer = document.querySelector(".item__img")
const productTitle = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const selectColors = document.querySelector("select")

let shoppingCart = JSON.parse(localStorage.getItem("CART")) || [] 
const addProduct = document.getElementById("addToCart")

fetch(productInfo)
.then(res => res.json())
.then(product => {
    let imgProduct = document.createElement("img")
    imgProduct.src = product.imageUrl
    imgContainer.appendChild(imgProduct)
    
    productTitle.innerText = product.name

    productPrice.innerText = product.price
    
    productDescription.innerText = product.description


    for(i=0; i<product.colors.length; i++){
        
        let productColorOption = document.createElement("option")
        productColorOption.value =  product.colors[i]
        productColorOption.innerText = product.colors[i]
        selectColors.appendChild(productColorOption)
    }
    
    addProduct.addEventListener("click",  e => addToCart())

    function addToCart() {

        const productQuantitySelected = document.getElementById("quantity").value
        const productColorsSelected = document.getElementById("colors").value

        if( productQuantitySelected >=1 && productQuantitySelected < 100 && productColorsSelected !== undefined &&  productColorsSelected !== "" ){
    
            let productChoosen = {
                color :productColorsSelected,
                name : product.name,
                price : product.price,
                quantity : productQuantitySelected ,
                imageSrc : product.imageUrl,
                description : product.description,
                id : productId
            }
            
            shoppingCart.push(productChoosen)
            localStorage.setItem("CART", JSON.stringify(shoppingCart))
        
           
            console.log(shoppingCart)
        }
        else {
            alert("vous devez selectionner une couleur et une quantité")
        
        }
    }

})