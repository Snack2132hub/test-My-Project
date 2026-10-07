<?php
// ตั้งค่าผ่าน environment variable (DB_HOST, DB_NAME, DB_USER, DB_PASS) หรือแก้ค่าเริ่มต้นด้านล่าง
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbName = getenv('DB_NAME') ?: '';
$dbUser = getenv('DB_USER') ?: '';
$dbPass = getenv('DB_PASS') ?: '';

try {
  $pdo = new PDO(
    "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
    $dbUser,
    $dbPass,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  );
} catch (PDOException $e) {
  error_log('Database connection failed: ' . $e->getMessage());
  http_response_code(500);
  die('ไม่สามารถเชื่อมต่อฐานข้อมูลได้');
}
