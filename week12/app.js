// สัปดาห์ที่ 12 ติดตั้งหน้าร้านบนจอโฮม
// ฟังก์ชัน removeFromCart มีให้แล้วด้านล่าง ถ้าของ week11 ทำงานถูกต้อง จะใช้ของตนเองแทนก็ได้
// คัดลอกอาร์เรย์ products ของร้านกลุ่มจาก week11 มาแทนบรรทัดถัดไป
const products = [
  { id: 1, name: "สินค้า 1", price: 100, unit: "ชิ้น", image: "images/product1.jpg" },
];

// ----- แสดงสินค้า -----
function showProducts() {
  const list = document.querySelector("#products");
  list.innerHTML = "";
  for (const p of products) {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h3>${p.name}</h3>
          <p class="price">${p.price} บาท / ${p.unit}</p>
          <button class="add" onclick="addToCart(${p.id})">ใส่ตะกร้า</button>
        </div>
      </div>`;
  }
}

// ----- ตะกร้า: เก็บเป็นรายการของ { id, qty } -----
let cart = loadCart();

function findProduct(id) {
  for (const p of products) {
    if (p.id === id) {
      return p;
    }
  }
}

function addToCart(id) {
  for (const item of cart) {
    if (item.id === id) {
      item.qty = item.qty + 1;
      saveCart();
      showCart();
      return;
    }
  }
  cart.push({ id: id, qty: 1 });
  saveCart();
  showCart();
}

function showCart() {
  const list = document.querySelector("#cart");
  let total = 0;
  list.innerHTML = "";
  for (const item of cart) {
    const p = findProduct(item.id);
    const sum = p.price * item.qty;
    total = total + sum;
    list.innerHTML += `<li>${p.name} x ${item.qty} = ${sum} บาท
      <button class="remove" onclick="removeFromCart(${p.id})">ลบ</button></li>`;
  }
  document.querySelector("#cart-total").textContent = total;
}

function removeFromCart(id) {
  const newCart = [];
  for (const item of cart) {
    if (item.id !== id) {
      newCart.push(item);
    }
  }
  cart = newCart;
  saveCart();
  showCart();
}

// ----- แสดงรูปสลิปที่เลือกหรือถ่าย (เตรียมไว้ให้) -----
function showPreview(input) {
  const file = input.files[0];
  if (file) {
    document.querySelector("#slip").src = URL.createObjectURL(file);
  }
}

// ----- จำตะกร้าไว้ในเครื่องด้วย localStorage -----
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const text = localStorage.getItem("cart");
  if (text === null) {
    return [];
  }
  return JSON.parse(text);
}

showProducts();
showCart();

// ----- ตรวจดูโค้ดลงทะเบียน service worker (เตรียมไว้ให้แล้ว ไม่ต้องแก้) -----
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
