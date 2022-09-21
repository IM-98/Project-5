
const API = "http://localhost:3000/api/products"
const itemList = document.querySelector(".items")


//requete GET à l'api qui nous retourne la liste de tous les produits avec leurs propriétés
fetch(API)
// conversion au format json, on extrait le body lorsque la promesse est résolu
.then(res => res.json())
.then(product => {

// pour chaque produit retourné par le backend, on créer les élements HTML nécessaire 
for(i =0; i<product.length; i++){

    
    let newItemLink = document.createElement("a")
    let newItemCard = document.createElement("article")
    let newItemImg = document.createElement("img")
    let newItemTitle = document.createElement("h3")
    let newItemDesc = document.createElement("p")

    // ajout du href dynamique sur la balise <a> du produit
    newItemLink.href = `./product.html?id=${product[i]._id}`
    // ajout du src de l'image du produit
    newItemImg.src = `${product[i].imageUrl}`
    // ajout du nom et de la description avec .innerText
    newItemTitle.innerText = product[i].name
    newItemDesc.innerText = product[i].description

    
    newItemCard.appendChild(newItemImg)
    newItemCard.appendChild(newItemTitle)
    newItemCard.appendChild(newItemDesc)

    newItemLink.appendChild(newItemCard)

    itemList.appendChild(newItemLink)
    }
})
