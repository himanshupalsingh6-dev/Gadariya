let users = [
  {id:"admin", password:"1234", role:"admin"},
  {id:"partner1", password:"1111", role:"partner"},
  {id:"delivery1", password:"2222", role:"delivery"}
];

// ================= PRODUCT DATA =================
let products = [
  {name:"Shirt Iron", price:15, qty:0},
  {name:"Pant Iron", price:20, qty:0},
  {name:"Saree Iron", price:30, qty:0}
];

// ================= LOAD PRODUCTS =================
function loadProducts(){
  let html="";

  products.forEach((p,i)=>{
    html += `
      <div class="card">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add</button>
      </div>
    `;
  });

  document.getElementById("productList").innerHTML = html;
}

// ================= ADD TO CART =================
function addToCart(i){
  products[i].qty++;

  localStorage.setItem("cart", JSON.stringify(products));

  alert("Added to cart ✅");
}

// ================= LOAD CART =================
function loadCart(){
  let data = JSON.parse(localStorage.getItem("cart")) || [];
  let html = "";
  let total = 0;

  data.forEach(p => {
    if(p.qty > 0){
      html += `
        <p>${p.name} x ${p.qty} = ₹${p.qty * p.price}</p>
      `;
      total += p.qty * p.price;
    }
  });

  if(html === ""){
    html = "<p>No items in cart</p>";
  }

  html += `<h3>Total ₹${total}</h3>`;

  document.getElementById("cartList").innerHTML = html;
}

// ================= PLACE ORDER =================
function placeOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if(name === "" || phone === "" || address === ""){
    alert("Please fill all details ❗");
    return;
  }

  let data = JSON.parse(localStorage.getItem("cart")) || [];

  let message = "🧺 QuickPress Order 🚀\n\n";
  let total = 0;

  data.forEach(p=>{
    if(p.qty > 0){
      message += `${p.name} x ${p.qty} = ₹${p.qty * p.price}\n`;
      total += p.qty * p.price;
    }
  });

  message += `\nTotal: ₹${total}\n`;
  message += `\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Address: ${address}`;

  let url = "https://wa.me/919997874502?text=" + encodeURIComponent(message);

  window.open(url, "_blank");

  // optional reset cart
  localStorage.removeItem("cart");
}
function login(){
  let id = document.getElementById("userid").value;
  let pass = document.getElementById("password").value;

  let user = users.find(u => u.id === id && u.password === pass);

  if(user){
    localStorage.setItem("currentUser", JSON.stringify(user));

    if(user.role === "admin"){
      window.location.href = "admin.html";
    }
    else if(user.role === "partner"){
      window.location.href = "partner.html";
    }
    else if(user.role === "delivery"){
      window.location.href = "delivery.html";
    }

  } else {
    alert("Invalid ID or Password ❌");
  }
}
