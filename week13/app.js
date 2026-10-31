// บทที่ 8 ขั้นที่ 1: QR พร้อมเพย์จากยอดตะกร้า และส่งออเดอร์ทาง LINE
const PROMPTPAY = "0800000000";   // เบอร์พร้อมเพย์ของร้าน (สมมติ)
// TODO 1: LINE ID สมมติของร้านกลุ่ม (ขึ้นต้นด้วย @)
const LINE_ID = "@ชื่อร้าน";     // LINE ID ของ LINE Official Account ร้าน (สมมติ)
// คัดลอกอาร์เรย์ products ของร้านกลุ่มจากสัปดาห์ก่อนมาแทนบรรทัดถัดไป
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
  showCheckout(total);
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

// ----- ชำระเงินและส่งออเดอร์ -----
function showCheckout(total) {
  document.querySelector("#pay-total").textContent = total;
  if (total > 0) {
    // TODO 2: เรียก makePromptPayQR(PROMPTPAY, total, "qr") เพื่อวาด QR ตามยอด

  } else {
    document.querySelector("#qr").innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
  }
  // TODO 3: แก้ "#" ในบรรทัดถัดไปให้เป็น "https://line.me/R/oaMessage/" + LINE_ID ที่เข้ารหัส + "/?" + orderText() ที่เข้ารหัส
  //         เข้ารหัสด้วย encodeURIComponent(...) ทั้งสองส่วน แก้ในบรรทัดเดิม ไม่ต้องเพิ่มบรรทัด const link ใหม่
  const link = "#";
  const button = document.querySelector("#send-line");
  button.href = link;
}

function orderText() {
  let text = "สั่งซื้อจากหน้าร้าน\n";
  let total = 0;
  for (const item of cart) {
    const p = findProduct(item.id);
    const sum = p.price * item.qty;
    total = total + sum;
    text += "- " + p.name + " x " + item.qty + " = " + sum + " บาท\n";
  }
  text += "รวม " + total + " บาท";
  return text;
}

function copyOrder() {
  if (cart.length === 0) {
    alert("ยังไม่มีสินค้าในตะกร้า");
    return;
  }
  navigator.clipboard.writeText(orderText());
  alert("คัดลอกข้อความออเดอร์แล้ว นำไปวางในแชต LINE ของร้านได้");
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

// ----- ลงทะเบียน service worker (เตรียมไว้ให้ ไม่ต้องแก้) -----
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
