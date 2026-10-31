// ใบงานที่ 13: รายการสินค้าและตะกร้า (เขียนและดูผลใน dartpad.dev แล้วคัดลอกมาวางที่ไฟล์นี้)
import 'package:flutter/material.dart';

// TODO 1: เปลี่ยนเป็นลิงก์ GitHub Pages ของกลุ่ม (ลงท้ายด้วย /)
const shopUrl = 'https://beebrain.github.io/lablae-shop/';

// สินค้าหนึ่งชิ้น ชื่อข้อมูลเหมือนอาร์เรย์ products ในบทที่ 6
class Product {
  final int id;
  final String name;
  final int price;
  final String unit;
  final String image;
  const Product(this.id, this.name, this.price, this.unit, this.image);
}

// TODO 2: เปลี่ยนเป็นสินค้าของร้านกลุ่มอย่างน้อย 3 ชิ้น (ใช้ข้อมูลเดียวกับหน้าร้านเว็บ)
const products = [
  Product(1, 'ทุเรียนหลงลับแล', 350, 'กก.', 'images/durian.jpg'),
  Product(2, 'ลางสาด', 60, 'กก.', 'images/longkong.jpg'),
  Product(3, 'ข้าวแคบ', 40, 'ห่อ', 'images/khaokhaep.jpg'),
];

void main() {
  runApp(const ShopApp());
}

class ShopApp extends StatelessWidget {
  const ShopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ร้านของฉัน', // เปลี่ยนชื่อร้านและสีหลักตามใบงานที่ 12 ได้
      theme: ThemeData(colorSchemeSeed: Colors.blue),
      home: const ProductPage(),
    );
  }
}

class ProductPage extends StatefulWidget {
  const ProductPage({super.key});

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  final Map<int, int> cart = {}; // id ของสินค้า -> จำนวน

  void addToCart(Product p) {
    // TODO 3: เพิ่มจำนวนสินค้า p ในตะกร้า 1 ชิ้น ภายใน setState(() { ... });
  }

  int total() {
    int sum = 0;
    for (final p in products) {
      sum += p.price * (cart[p.id] ?? 0);
    }
    return sum;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ส่วนท้าทาย: เพิ่ม actions: [ IconButton(...) ] ใน AppBar นี้เพื่อเปิดหน้าตะกร้า
      appBar: AppBar(title: const Text('ร้านของฉัน')),
      // TODO 4: เปลี่ยนเป็น ListView.builder ที่สร้าง Card + ListTile ของสินค้าแต่ละชิ้น
      //         มีรูป ชื่อ ราคา และปุ่มที่แตะแล้วเรียก addToCart(p)
      body: const Center(child: Text('ยังไม่มีรายการสินค้า')),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        color: Theme.of(context).colorScheme.primaryContainer,
        child: SafeArea(
          child: Text('ยอดรวม ${total()} บาท',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ),
      ),
    );
  }
}

// ส่วนท้าทาย: วางคลาส CartPage ต่อท้ายไฟล์นี้ (นอกคลาส _ProductPageState)
