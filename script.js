let cart = [];

const foods = [
    {id:1, name:"Cheese Burger", price:150, category:"burger", image:"images/cheese burger.jpeg"},
    {id:2, name:"Chicken Burger", price:250, category:"burger", image:"images/Chicken Burger.jpg"},
    {id:3, name:"French Fries", price:120, category:"burger", image:"images/french fries.jpg"},
    {id:4, name:"Burger", price:120, category:"burger", image:"images/burg1.jpeg"},
    {id:45, name:"Burger", price:150, category:"burger", image:"images/burg2.jpeg"},
    {id:28, name:"Burger", price:180, category:"burger", image:"images/burg3.jpeg"},
    {id:29, name:"Burger", price:120, category:"burger", image:"images/burg4.jpeg"},
    {id:30, name:"Burger", price:130, category:"burger", image:"images/burg5.jpeg"},
    {id:31, name:"Burger", price:140, category:"burger", image:"images/burg6.jpeg"},
    {id:44, name:"Margherita Pizza", price:150, category:"pizza", image:"images/Margherita Pizza.jpeg"},
    {id:5, name:"Pepperoni Pizza", price:200, category:"pizza", image:"images/Pepperoni Pizza.jpeg"},
    {id:6, name:"Veggie Pizza", price:150, category:"pizza", image:"images/Veggie Pizz.webp"},
    {id:7, name:"Pizza 2", price:150, category:"pizza", image:"images/pizza2.jpeg"},
    {id:8, name:"Pizza 3", price:180, category:"pizza", image:"images/pizza3.jpg"},
    {id:9, name:"Pizza 4", price:160, category:"pizza", image:"images/pizza4.jpeg"},
    {id:10, name:"Pizza 5", price:150, category:"pizza", image:"images/pizza5.jpeg"},
    {id:11, name:"Pizza 6", price:200, category:"pizza", image:"images/pizza6.jpeg"},
    {id:12, name:"Coca Cola", price:80, category:"drinks", image:"images/Coca Cola.jpeg"},
     {id:32, name:"Drink", price:100, category:"drinks", image:"images/drink1.jpeg"},
      {id:33, name:"Drink", price:150, category:"drinks", image:"images/drink2.jpeg"},
    {id:13, name:"Orange Juice", price:60, category:"drinks", image:"images/Orange Juice.webp"},
    {id:14, name:"Coffee", price:50, category:"drinks", image:"images/coffee.jpeg"},
    {id:15, name:"Chocolate Cake", price:180, category:"dessert", image:"images/Chocolate Cake.jpeg"},
    {id:16, name:"Ice Cream", price:200, category:"dessert", image:"images/icecream.jpeg"},
    {id:17, name:"Donut", price:100, category:"dessert", image:"images/donut.jpeg"},
    {id:34, name:"Dessert", price:150, category:"dessert", image:"images/des1.jpeg"},
    {id:35, name:"Dessert", price:180, category:"dessert", image:"images/des2.jpeg"},
    {id:36, name:"Dessert", price:120, category:"dessert", image:"images/des3.jpeg"},
    {id:18, name:"Chicken biryani", price:300, category:"food", image:"images/chik bry.jpeg"},
    {id:19, name:"Chicken leg", price:250, category:"food", image:"images/chik leg.jpeg"},
    {id:20, name:"Chicken", price:200, category:"food", image:"images/chik.jpeg"},
    {id:21, name:"Mutton dum Biryani", price:400, category:"food", image:"images/dum mutt.jpeg"},
    {id:22, name:"Egg biryani", price:200, category:"food", image:"images/egg bry.jpeg"},
    {id:23, name:"Egg curry", price:180, category:"food", image:"images/egg.webp"},
    {id:24, name:"Mutton biryani", price:350, category:"food", image:"images/mutt bry.jpeg"},
    {id:25, name:"Mutton", price:300, category:"food", image:"images/mutt.jpeg"},
    {id:26, name:"Veg biryani", price:250, category:"food", image:"images/veg bry.jpeg"},
    {id:27, name:"Veg biryani2", price:280, category:"food", image:"images/veg ry bry.avif"},
];

// Show section
let isLoggedIn = false;

function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username === "admin" && password === "1234") {

        isLoggedIn = true;

        document.getElementById("navbar").style.display = "flex";

        showSection("home");

    } else {
        alert("Invalid username or password!");
    }
}

function showSection(sectionId) {

    if (!isLoggedIn && sectionId !== "login") {
        return;
    }

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}


// Display foods with scroll animation
function displayFoods(foodArray) {
    const container = document.getElementById("food-container");
    container.innerHTML = "";

    foodArray.forEach(food => {
        container.innerHTML += `
            <div class="food-item">
                <h3>${food.name}</h3>
                <p>$${food.price}</p>
                <button onclick="addToCart('${food.name}', ${food.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Animate food cards on scroll
function animateFoodCards(){
    const cards = document.querySelectorAll('.food-card');
    cards.forEach(card=>{
        card.classList.remove('show');
        setTimeout(()=>card.classList.add('show'), 100);
    });
}

// Cart functions
function addToCart(id){
    const food = foods.find(item => item.id === id);

    const existing = cart.find(i => i.id === food.id);

    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({...food, quantity: 1});
    }

    updateCart();
}



function updateCart(){
    const cartItems=document.getElementById("cart-items");
    cartItems.innerHTML="";
    let total=0;
    cart.forEach((item,index)=>{
        total += item.price*item.quantity;
        cartItems.innerHTML += `<li>${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="decreaseQuantity(${index})">➖</button>
            <button onclick="removeItem(${index})">❌</button>
        </li>`;
    });
    document.getElementById("total").innerText=total;
    document.getElementById("cart-count").innerText=cart.length;
}
function removeItem(index){ cart.splice(index,1); updateCart(); }
function decreaseQuantity(index){ 
    if(cart[index].quantity>1) cart[index].quantity--;
    else cart.splice(index,1);
    updateCart();
}

// Toggle cart with overlay
function toggleCart(){
    const cartEl=document.getElementById("cart");
    const overlay=document.getElementById("cart-overlay");
    cartEl.classList.toggle('active');
    overlay.classList.toggle('active');
    updateCart();
}

// Filter category
function filterCategory(category) {

    // Highlight active button
    const buttons = document.querySelectorAll('.category-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter logic
    const filteredFoods = category === "all"
        ? foods
        : foods.filter(food => food.category === category);

    displayFoods(filteredFoods);
}

// Search bar
document.getElementById("search").addEventListener("input", function(){
    const value=this.value.toLowerCase();
    displayFoods(foods.filter(f=>f.name.toLowerCase().includes(value)));
});

// Checkout
function checkout(){
    if(cart.length===0){ alert("Cart is empty!"); return; }
    let total = cart.reduce((sum,i)=>sum+i.price*i.quantity,0);
    alert(`Order placed! Total: $${total}`);
    cart=[];
    updateCart();
}


//checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    toggleCart(); // close cart
    showSection("delivery"); // open delivery page
}


//place order
function placeOrder(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Name: " + name +
        "\nPhone: " + phone +
        "\nAddress: " + address +
        "\n\nYour food will arrive in 30-45 minutes."
    );

    cart = [];
    updateCart();

    showSection("home");

    document.querySelector("form").reset();
}

// Initial load
showSection('login');

// Mobile menu
function toggleMobileMenu(){
    document.querySelector('nav ul').classList.toggle('show');
}




function displayFoods(foodArray) {
    const container = document.getElementById("food-container");
    container.innerHTML = "";

    foodArray.forEach(food => {
        container.innerHTML += `
            <div class="food-item">
                <img src="${food.image}" alt="${food.name}">
                <h3>${food.name}</h3>
                <p>$${food.price}</p>
                <button onclick="addToCart(${food.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}



