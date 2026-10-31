// สัปดาห์ที่ 10 ตะกร้าสินค้าที่จำค่าได้
// คัดลอกอาร์เรย์ products ของร้านกลุ่มจาก week09 มาแทนบรรทัดถัดไป
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
      // TODO 1: สินค้านี้อยู่ในตะกร้าแล้ว เพิ่ม item.qty ขึ้น 1

      saveCart();
      showCart();
      return;
    }
  }
  // TODO 2: ยังไม่มีในตะกร้า เพิ่มรายการใหม่ { id: id, qty: 1 } ด้วย cart.push(...)

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
    // TODO 3: บวก sum เข้า total

    list.innerHTML += `<li>${p.name} x ${item.qty} = ${sum} บาท</li>`;
  }
  document.querySelector("#cart-total").textContent = total;
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
