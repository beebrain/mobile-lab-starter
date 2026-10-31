// ขั้นที่ 1: ตัวแปรและการคำนวณ
const productName = "ทุเรียนหลงลับแล";
const price = 350;
let qty = 2;

let total = price * qty;
console.log(productName + " " + qty + " กก. รวม " + total + " บาท");

qty = qty + 1;
total = price * qty;
console.log(productName + " " + qty + " กก. รวม " + total + " บาท");
