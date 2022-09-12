
const API = "http://localhost:3000/api/products"
const itemList = document.querySelector(".items")



fetch(API)
.then(res => res.json())
.then(product => {


for(i =0; i<product.length; i++){

    
    let newItemLink = document.createElement("a")
    let newItemCard = document.createElement("article")
    let newItemImg = document.createElement("img")
    let newItemTitle = document.createElement("h3")
    let newItemDesc = document.createElement("p")

    newItemLink.href = `./product.html?id=${product[i]._id}`
    newItemImg.src = `${product[i].imageUrl}`
    newItemTitle.innerText = product[i].name
    newItemDesc.innerText = product[i].description

    
    newItemCard.appendChild(newItemImg)
    newItemCard.appendChild(newItemTitle)
    newItemCard.appendChild(newItemDesc)

    newItemLink.appendChild(newItemCard)

    itemList.appendChild(newItemLink)
    }
})
