// ไฟล์ช่วยสร้าง QR พร้อมเพย์ของวิชา (ไม่ต้องแก้ไฟล์นี้)
// สร้างข้อความตามมาตรฐาน Thai QR Payment (EMVCo) จากเบอร์พร้อมเพย์และยอดเงิน
// แล้ววาดเป็นรูป QR ด้วยไลบรารี qrcode-generator

function promptPayPayload(phone, amount) {
  function field(id, value) {
    return id + String(value.length).padStart(2, "0") + value;
  }
  const digits = phone.replace(/[^0-9]/g, "");
  const target = ("0066" + digits.replace(/^0/, "")).padStart(13, "0");
  const account = field("00", "A000000677010111") + field("01", target);
  // เรียงช่องข้อมูลตามเลขช่องจากน้อยไปมาก: 00 01 29 53 54 58 แล้วปิดด้วย 63 (รหัสตรวจสอบ)
  let data = field("00", "01") + field("01", amount ? "12" : "11") + field("29", account) +
    field("53", "764");
  if (amount) {
    data += field("54", Number(amount).toFixed(2));
  }
  data += field("58", "TH") + "6304";
  return data + crc16(data);
}

function crc16(text) {
  let crc = 0xffff;
  for (let i = 0; i < text.length; i++) {
    crc ^= text.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// วาด QR พร้อมเพย์ลงในแท็กที่มี id ตามที่กำหนด
function makePromptPayQR(phone, amount, elementId) {
  const qr = qrcode(0, "M");
  qr.addData(promptPayPayload(phone, amount));
  qr.make();
  document.getElementById(elementId).innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2 });
}
