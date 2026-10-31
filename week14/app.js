// บทที่ 8 ขั้นที่ 2: แจ้งนโยบายความเป็นส่วนตัว และขอความยินยอมแยกสำหรับข่าวสาร (PDPA)
const PROMPTPAY = "0800000000";   // เบอร์พร้อมเพย์ของร้าน (สมมติ)
const LINE_ID = "@ชื่อร้าน";   // ใช้ LINE ID สมมติเดียวกับ week13
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
    makePromptPayQR(PROMPTPAY, total, "qr");
  } else {
    document.querySelector("#qr").innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
  }
  const link = "https://line.me/R/oaMessage/" + encodeURIComponent(LINE_ID) + "/?" + encodeURIComponent(orderText());
  const button = document.querySelector("#send-line");
  // TODO 2: เขียน if...else ตรงนี้
  //   ถ้ามีสินค้า (total > 0) และติ๊ก #notice แล้ว: ใส่ link ลงใน button.href และลบคลาส disabled
  //   ถ้าไม่ใช่: ให้ button.href เป็น "#" และเพิ่มคลาส disabled
  //   ใช้ && แปลว่า "และ" ส่วน #marketing ไม่ต้องใช้ในเงื่อนไขนี้

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
