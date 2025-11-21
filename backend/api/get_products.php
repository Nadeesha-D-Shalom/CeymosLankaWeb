<?php
include "../db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT p.*, c.name AS category_name 
        FROM products p 
        INNER JOIN categories c ON p.category_id = c.id
        ORDER BY p.id DESC";

$result = $conn->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>
