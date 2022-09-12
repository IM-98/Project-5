const productId = new URL(location.href).searchParams.get("id");
const productInfo = `http://localhost:3000/api/products/${productId}`

const imgContainer = document.querySelector(".item__img")
const productTitle = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const selectColors = document.querySelector("select")


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

})