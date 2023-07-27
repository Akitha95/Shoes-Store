let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};

calculation();

let generateCartItem = () => {
   if (basket.length !==0) {
   
    return (ShoppingCart.innerHTML = basket.map((x) => {
        
        let {id, item}=x;
        let search = shopItemData.find((y)=>y.id ===id) || [];
        let {img, name, price}= search;
        return `
        <div class = "cart-item">
            <img width ="100" src=${search.img} alt=""/>
            <div class= "details">
               <div class = "title-price-x">
                    <h5 class="title-price">
                        <p>${name}</p>
                        
                    </h5>
                    <p class="cart-item-price">$ ${price}</p>
                    <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>

               </div> 

               <div class="button">
                    <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                        ${item} 
                    </div>
                    <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                </div>

               <h3>$ ${item * price}</h3>
            </div>
        </div>
       
        `;
    })
    .join(""));

   }
   else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href = "index.html">
        <button class = "HomeBtn">Back to home</button>
    </a>
    `; 
    
   
    
   }
};

generateCartItem();

let increment = (id) => {
  
    let selectedIterm = id;
 
    let search = basket.find((x) => x.id === selectedIterm.id);
 
    if(search === undefined){
        basket.push({
            id: selectedIterm.id,
            item: 1,
        });
        
       
    } else {
        search.item +=1;
    }
    generateCartItem();
    update(selectedIterm.id);
    localStorage.setItem("data", JSON.stringify(basket));
    

};

let decrement = (id)=>{
    let selectedIterm = id;
    let search =basket.find((x)=> x.id === selectedIterm.id);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -=1;
    }
    update(selectedIterm.id);
    basket = basket.filter((x)=>x.item !==0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    
    let search = basket.find((x) => x.id === id);
     document.getElementById(id).innerHTML = search.item;
     calculation();
     TotalAmount();
   
};

let removeItem = (id) => {
    let selectedIterm = id;
    basket = basket.filter((x) => x.id !== selectedIterm.id);
    generateCartItem();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
   
};

let clesrCart = ()=>{
    basket= [];
    generateCartItem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = ()=>{
    if(basket.length !==0){
        let amount = basket.map((x) => {
            let {item,id}=x;
            let search = shopItemData.find((y)=>y.id ===id) || [];
            return item*search.price
        }).reduce((x,y)=>x+y,0);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkut</button>
        <button onclick = "clesrCart()" class="remveAll">clear cart</button>
        `

    }
    else return
};

TotalAmount();

