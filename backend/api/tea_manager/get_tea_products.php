<?php
// backend/api/tea_manager/get_tea_products.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../db.php";

$result = $conn->query("
    SELECT 
        id,
        title,
        tasting_notes,
        ingredients,
        tea_grade,
        net_weight,
        image
    FROM tea_products
    ORDER BY created_at DESC, id DESC
");

if ($result === false) {
    echo json_encode([
        "success" => false,
        "message" => "Database query failed",
        "error"   => $conn->error
    ]);
    exit;
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
