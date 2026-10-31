// สัปดาห์ที่ 7 ปุ่มเพิ่มลดจำนวนและคำนวณราคา ทำตาม TODO 1-3

// TODO 1: แก้ราคาให้ตรงกับสินค้าใน index.html
const price = 0;
let qty = 1;

const qtyText = document.querySelector("#qty");
const totalText = document.querySelector("#total");
// ส่วนท้าทาย: ใช้ตัวแปรนี้เขียนข้อความส่วนลดลงในแท็ก <p id="note">
const noteText = document.querySelector("#note");

// ส่วนท้าทาย: (1) เขียนฟังก์ชัน calcTotal(price, qty) ตรงนี้ เหนือฟังก์ชัน update
//            (2) ใน update() ใช้ calcTotal แทน price * qty และเขียน if...else แสดงข้อความใน noteText

// เขียนจำนวนและยอดรวมลงบนจอ (เตรียมไว้ให้แล้ว)
function update() {
  qtyText.textContent = qty;
  totalText.textContent = price * qty;
}

// TODO 2: ปุ่มบวก หาแท็ก #plus แล้วรอ "click" เพิ่ม qty ทีละ 1 แล้วเรียก update()


// TODO 3: ปุ่มลบ หาแท็ก #minus แล้วรอ "click" ลด qty ทีละ 1 เมื่อ qty มากกว่า 1 แล้วเรียก update()


update();
