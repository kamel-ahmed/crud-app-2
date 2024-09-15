
const productName = document.getElementById("name")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")

const warningAlert=document.getElementById("warning")


const lightModeBtn = document.getElementById("lightMode")
const darkModeBtn = document.getElementById("darkMode")


const addProductBtn = document.querySelector("#addProduct")
const editProductBtn = document.querySelector("#editProduct")

const searchProduct = document.querySelector("#search")


const productsContainer=document.querySelector(".products")

const goUpBtn =document.querySelector("#goUp")



let allProducts=[]

const localStorageProducts = localStorage.getItem("productsList")


if(localStorageProducts){
    const JSlocalStorageProducts = JSON.parse(localStorageProducts)

    allProducts = JSlocalStorageProducts
        
    displayProducts(allProducts)
    
}

// --------------------------------------------------------------------------
            // light Mode
function lightMode() {
    lightModeBtn.setAttribute("isActive", "true");
    darkModeBtn.setAttribute("isActive", "false")
    
    if(lightModeBtn.getAttribute("isActive") === "true"){
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
        lightModeBtn.style.backgroundColor="yellow"
        darkModeBtn.style.backgroundColor="white"

        addProductBtn.style.color = "black"
        editProductBtn.style.color = "black"
        // console.log(lightModeBtn.style)
    }
};
            // Dark mode
function darkMode() {
    darkModeBtn.setAttribute("isActive", "true")
    lightModeBtn.setAttribute("isActive", "false")
    

    if(darkModeBtn.getAttribute("isActive") === "true"){
        document.body.style.backgroundColor = "rgb(50 50 50)"
        document.body.style.color = "white"
        lightModeBtn.style.backgroundColor="rgb(50 50 50)"
        darkModeBtn.style.backgroundColor="lightgray"

        addProductBtn.style.color = "white"
        editProductBtn.style.color = "white"
        // document.productsContainer.productCard.style.border = "2px solid white"
    }
};
// ---------------------------------------------------------------------------


                    // Add Product 
function addProduct (e){
    e.preventDefault()


    const product = {
        id:Date.now(),
        name:productName.value,
        price:productPrice.value,
        description:productDescription.value
    }
    if(productName.value ==="" || productPrice.value ==="" || productDescription.value ==="" ){
        warning.innerText="plese full all feilds"
        warning.style.display="block"  
             
    }else{
        allProducts.push(product)
        localStorage.setItem("productsList",JSON.stringify(allProducts))
        displayProducts(allProducts)
        warning.style.display="none" 


        productName.value ="" 
        productPrice.value ="" 
        productDescription.value =""  

        window.scrollTo({
            top:1000000000000000000,
            behavior: "smooth"
        })
    }

};
addProductBtn.addEventListener("click", addProduct)

// ---------------------------------------------------------------------------


                    // Search
function serchForProduct(){
    let serchWord = searchProduct.value
    let searchResult = []
    
    for (let i = 0; i < allProducts.length; i++) {
        if(allProducts[i].name.toLowerCase().includes(serchWord.toLowerCase()) || 
            allProducts[i].description.toLowerCase().includes(serchWord.toLowerCase())
        ){
            searchResult.push(allProducts[i])
            displayProducts(searchResult)
           
        }else if(searchResult.length == 0){

            displayProducts([]);
            productsContainer.innerHTML = `there is no product`
        }
    }
    
};

// ---------------------------------------------------------------------------

                    // display Products
function displayProducts(list){
    let productsData = ``

    if(serchForProduct.value ===""){
        serchForProduct(searchResult)
    }else{
        for(let i=0 ; i < list.length ; i++){
            productsData += 
            `
                <div  class="product" >
                    <p>name: ${list[i].name}</p>
                    <p>price: ${list[i].price} $</p>
                    <p>description: ${list[i].description}</p>
    
                    <button class="ubdateBtn" onClick="updateProduct(${list[i].id})">update</button>
                    <button class="deleteBtn" onClick="deleteProduct(${list[i].id})">delete</button>
                </div>
            `
        }

    
        
    }
    
    productsContainer.innerHTML = productsData
};

// ---------------------------------------------------------------------------

                    // Delete Product
function deleteProduct(productId) {
    const newProducts = allProducts.filter(function(product){
        return product.id !== productId
    })
    allProducts = newProducts
    localStorage.setItem("productsList",JSON.stringify(allProducts))
    displayProducts(allProducts)
};

// ---------------------------------------------------------------------------

                    // Edit Product
function updateProduct(productId){
    // console.log("updated: " + productId);
    editProductBtn.style.display="block"
    addProductBtn.style.display="none"

    const selectedProduct = allProducts.filter(function(product){
        
        return product.id === productId
    });
    console.log(selectedProduct[0]);
    
    productName.value = selectedProduct[0].name;
    productPrice.value = selectedProduct[0].price;
    productDescription.value = selectedProduct[0].description;


    window.scrollTo({
        top:0,
        behavior: "smooth"
    })
    
    editProductBtn.addEventListener("click",updateProduct)

};


function submitEdit() {

    if( !productName.value || !productPrice.value || !productDescription.value) {
        warning.innerText="plese full all feilds"
        warning.style.display = "block";
    }
    else{
        alert("! this futcher not worked yet")

    //         warning.style.display = "none";
    //         let pName = productName.value
    //         let pPrice = productPrice.value
    //         let pDescription = productDescription.value

    //         const updatedProduct = {
    //             productId: productId,
    //             pName,
    //             pPrice,
    //             pDescription,
    //           };

    //         allProducts[productId] = updatedProduct
    //         localStorage.setItem("productsList", JSON.stringify(allProducts));
    //         displayProducts(allProducts);
        
    }

    

// //     const updatedProduct ={
// //         pName,
// //         pPrice,
// //         pDescription,
// //     };

// //     products[pIndex] = updatedProduct;
// //     localStorage.setItem("productsList", JSON.stringify(allProducts));
// //     displayProducts(allProducts)
};


// -------------------------------------------------------------------------

                    // goUp Botton

// onScroll Event
window.onscroll = function(){
    if(document.documentElement.scrollTop > 2 * window.innerHeight){
        goUpBtn.style.display="block"
    }else{
        goUpBtn.style.display="none"
    }
}

// onClick event
function goUp() {

    window.scrollTo({
        top:0,
        behavior: "smooth"
    })
        
}

