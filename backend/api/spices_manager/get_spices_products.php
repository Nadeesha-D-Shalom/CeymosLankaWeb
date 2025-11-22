<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$result = $conn->query("
    SELECT id, title, description, net_weight, image
    FROM spices_products
    ORDER BY created_at DESC, id DESC
");

$data = [];
while ($row = $result->fetch_assoc()) $data[] = $row;

echo json_encode($data);
