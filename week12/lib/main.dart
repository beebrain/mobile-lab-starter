// ใบงานที่ 12: หน้าแรกของแอปร้าน (เขียนและดูผลใน dartpad.dev แล้วคัดลอกมาวางที่ไฟล์นี้)
import 'package:flutter/material.dart';

// TODO 1: เปลี่ยนเป็นลิงก์ GitHub Pages ของกลุ่ม (ลงท้ายด้วย /)
const shopUrl = 'https://beebrain.github.io/lablae-shop/';

void main() {
  runApp(const ShopApp());
}

class ShopApp extends StatelessWidget {
  const ShopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ร้านของฉัน',
      // TODO 2: เปลี่ยนสีเป็นสีหลักของร้านจากต้นแบบ Figma เช่น const Color(0xFF2E7D32)
      theme: ThemeData(colorSchemeSeed: Colors.blue),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  // แสดงข้อความสั้น ๆ ที่ด้านล่างของจอ
  void showMessage(BuildContext context, String text) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // TODO 3: เปลี่ยนชื่อบนแถบด้านบนเป็นชื่อร้านของกลุ่ม
      appBar: AppBar(title: const Text('ร้านของฉัน')),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // TODO 4: รูปร้านด้วย Image.network('${shopUrl}images/shop.jpg', ...) พร้อม errorBuilder (ลบบรรทัด const Text ด้านล่างเมื่อเริ่มทำ)
          const Text('เริ่มเขียนตรงนี้'),

          // TODO 5: ข้อความแนะนำร้านด้วย Text ใน Padding (วางต่อจากรูป)

          // TODO 6: Row ที่มีปุ่ม 2 ปุ่ม (โทรหาร้าน และที่ตั้งร้าน) แตะแล้วเรียก showMessage (วางเป็นตัวสุดท้ายก่อน ])
        ],
      ),
    );
  }
}
