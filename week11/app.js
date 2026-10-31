// สัปดาห์ที่ 11 ลบสินค้า โทรหาร้าน นำทาง และแนบสลิป
// คัดลอกอาร์เรย์ products ของร้านกลุ่มจาก week10 มาแทนบรรทัดถัดไป
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
  // TODO 1: สร้างตะกร้าใหม่ newCart ที่มีทุกรายการยกเว้นรายการที่ item.id ตรงกับ id
  //         แล้วใส่ cart = newCart; จากนั้นเรียก saveCart(); และ showCart();
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

// ----- ส่วนท้าทาย (ข): ระยะทางเป็นกิโลเมตรจากพิกัดสองจุด (เตรียมไว้ให้) -----
// ตัวอย่างการเรียกใช้ เมื่อได้ lat lng ของลูกค้าแล้ว และร้านอยู่ที่พิกัด 17.65, 100.04
//   const d = distanceKm(lat, lng, 17.65, 100.04);
//   alert("ระยะทางไปร้าน " + d.toFixed(1) + " กม.");
function distanceKm(lat1, lng1, lat2, lng2) {
  const r = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(a));
}
