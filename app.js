let products = [
  {name:"Shirt", price:15, qty:0},
  {name:"Pant", price:20, qty:0},
  {name:"Saree", price:30, qty:0}
];

function loadProducts(){
  let html="";
  products.forEach((p,i)=>{
    html += `
      <div class="qty">
        ${p.name} ₹${p.price}
        <button onclick="add(${i})">+</button>
      </div>
    `;
  });
  document.getElementById("productList").innerHTML = html;
}

function add(i){
  products[i].qty++;
  localStorage.setItem("cart", JSON.stringify(products));
  alert("Added to cart");
} 
