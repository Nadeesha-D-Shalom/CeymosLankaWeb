<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../db.php");

$sql = "SELECT id, title, tasting_notes, ingredients, tea_grade, caffeine_level, net_weight, image, category_id 
        FROM tea_products
        ORDER BY id DESC";

$result = $conn->query($sql);

$products = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);
?>
