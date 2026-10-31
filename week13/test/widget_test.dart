// ตรวจว่าแอปเปิดได้ (flutter create จะไม่สร้างไฟล์ทดสอบที่อ้างถึง MyApp มาทับ)
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lablae_shop/main.dart';

void main() {
  testWidgets('แอปเปิดได้', (tester) async {
    await tester.pumpWidget(const ShopApp());
    expect(find.byType(MaterialApp), findsWidgets);
  });
}