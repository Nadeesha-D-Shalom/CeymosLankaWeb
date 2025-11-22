<?php
// backend/api/tea_manager/get_single_tea.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../db.php";

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid product id"
    ]);
    exit;
}

$stmt = $conn->prepare("
    SELECT 
        id,
        title,
        tasting_notes,
        ingredients,
        tea_grade,
        net_weight,
        image
    FROM tea_products
    WHERE id = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if (!$result || $result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Product not found"
    ]);
    $stmt->close();
    exit;
}

echo json_encode([
    "success" => true,
    "product" => $result->fetch_assoc()
]);

$stmt->close();
