let products = [
  {name:"Shirt Iron", price:15, qty:0},
  {name:"Pant Iron", price:20, qty:0},
  {name:"Saree Iron", price:30, qty:0}
];

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

function addToCart(i){
  products[i].qty++;
  localStorage.setItem("cart", JSON.stringify(products));
  alert("Added to cart");
}
