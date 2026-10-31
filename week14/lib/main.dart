// ใบงานที่ 14: แอปที่จะ build เป็น APK (วางโค้ดใบงานที่ 13 ของตนทับไฟล์นี้ได้ ถ้ารันใน DartPad ผ่านแล้ว)
import 'package:flutter/material.dart';

// ทางเลือกสำรอง (ถ้าไม่ใช้โค้ดใบงานที่ 13 ของตน): แก้ shopUrl รายการ products และชื่อร้านใน AppBar
const shopUrl = 'https://beebrain.github.io/lablae-shop/';

class Product {
  final int id;
  final String name;
  final int price;
  final String unit;
  final String image;
  const Product(this.id, this.name, this.price, this.unit, this.image);
}

const products = [
  Product(1, 'ทุเรียนหลงลับแล', 350, 'กก.', 'images/durian.jpg'),
  Product(2, 'ลางสาด', 60, 'กก.', 'images/longkong.jpg'),
  Product(3, 'ข้าวแคบ', 40, 'ห่อ', 'images/khaokhaep.jpg'),
  Product(4, 'ทุเรียนกวน', 150, 'กล่อง', 'images/durian-paste.jpg'),
  Product(5, 'กล้วยตาก', 50, 'ห่อ', 'images/banana.jpg'),
];

void main() {
  runApp(const ShopApp());
}

class ShopApp extends StatelessWidget {
  const ShopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ลับแลของฝาก',
      theme: ThemeData(colorSchemeSeed: const Color(0xFF2E7D32)),
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
    setState(() {
      cart[p.id] = (cart[p.id] ?? 0) + 1;
    });
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
      appBar: AppBar(
        title: const Text('ลับแลของฝาก'),
        actions: [
          IconButton(
            onPressed: () => Navigator.push(context,
                MaterialPageRoute(builder: (context) => CartPage(cart: cart, total: total()))),
            icon: const Icon(Icons.shopping_cart),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, i) {
          final p = products[i];
          return Card(
            child: ListTile(
              leading: Image.network('$shopUrl${p.image}', width: 64, fit: BoxFit.cover,
                  errorBuilder: (context, error, stack) => const Icon(Icons.image)),
              title: Text(p.name),
              subtitle: Text('${p.price} บาท / ${p.unit}'),
              trailing: IconButton.filled(
                onPressed: () => addToCart(p),
                icon: const Icon(Icons.add_shopping_cart),
              ),
            ),
          );
        },
      ),
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

class CartPage extends StatelessWidget {
  final Map<int, int> cart;
  final int total;
  const CartPage({super.key, required this.cart, required this.total});

  @override
  Widget build(BuildContext context) {
    final items = products.where((p) => (cart[p.id] ?? 0) > 0).toList();
    return Scaffold(
      appBar: AppBar(title: const Text('ตะกร้า')),
      body: ListView(
        children: [
          for (final p in items)
            ListTile(
              title: Text(p.name),
              subtitle: Text('${cart[p.id]} x ${p.price} บาท'),
              trailing: Text('${cart[p.id]! * p.price} บาท'),
            ),
          ListTile(
            title: const Text('ยอดรวม', style: TextStyle(fontWeight: FontWeight.bold)),
            trailing: Text('$total บาท', style: const TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}