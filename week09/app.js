// สัปดาห์ที่ 9 รายการสินค้าจากอาร์เรย์
// TODO 1: แก้สินค้าตัวอย่างให้เป็นสินค้าของร้านกลุ่ม
// TODO 2: เพิ่มสินค้าให้ครบอย่างน้อย 5 ชิ้น (id เป็นตัวเลขไม่ซ้ำ เช่น 1 2 3 ราคาเป็นตัวเลข คั่นแต่ละชิ้นด้วยจุลภาค)
// TODO 3: แก้ image ให้ตรงกับชื่อไฟล์ในโฟลเดอร์ images
const products = [
  { id: 1, name: "สินค้า 1", price: 100, unit: "ชิ้น", image: "images/product1.jpg" },
];

// แสดงการ์ดสินค้าทุกชิ้น (เตรียมไว้ให้แล้ว)
function showProducts() {
  const list = document.querySelector("#products");
  list.innerHTML = "";
  // เขียนหมายเหตุ: การวนซ้ำบรรทัดถัดไปทำอะไร
  for (const p of products) {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h3>${p.name}</h3>
          <p class="price">${p.price} บาท / ${p.unit}</p>
        </div>
      </div>`;
  }
}

showProducts();
