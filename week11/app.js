// ใบงานที่ 11: ความสามารถของมือถือ รับชำระเงิน และส่งออเดอร์ (ทำ TODO 1-5 ตามบทที่ 7)
const PROMPTPAY = "0800000000";   // เบอร์พร้อมเพย์ของร้าน (สมมติ)
const LINE_ID = "@lablae-demo"; // TODO 1: LINE ID สมมติของ LINE Official Account ร้านกลุ่ม
const products = [
  { id: 1, name: "ทุเรียนหลงลับแล", price: 350, unit: "กก.", image: "images/durian.jpg" },
  { id: 2, name: "ลางสาด", price: 60, unit: "กก.", image: "images/longkong.jpg" },
  { id: 3, name: "ข้าวแคบ", price: 40, unit: "ห่อ", image: "images/khaokhaep.jpg" },
  { id: 4, name: "ทุเรียนกวน", price: 150, unit: "กล่อง", image: "images/durian-paste.jpg" },
  { id: 5, name: "กล้วยตาก", price: 50, unit: "ห่อ", image: "images/banana.jpg" },
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
    // TODO 3: สร้าง QR พร้อมเพย์ตามยอด total ลงในแท็ก id="qr" ด้วย makePromptPayQR
  } else {
    document.querySelector("#qr").innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
  }
  const link = "#"; // TODO 4: ลิงก์ oaMessage ที่เข้ารหัส LINE_ID และ orderText() ด้วย encodeURIComponent
  const button = document.querySelector("#send-line");
  // ส่งออเดอร์ได้เมื่อมีสินค้าและลูกค้ารับทราบนโยบายแล้ว (ความยินยอมรับข่าวสารไม่บังคับ)
  // TODO 5: ส่งได้เมื่อมีสินค้า และ ติ๊กช่อง id="notice" แล้ว (เพิ่มเงื่อนไขที่สองด้วย &&)
  if (total > 0) {
    button.href = link;
    button.classList.remove("disabled");
  } else {
    button.href = "#";
    button.classList.add("disabled");
  }
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
  if (document.querySelector("#marketing").checked) {
    text += "\nยินยอมรับข่าวสารจากร้าน";
  }
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
