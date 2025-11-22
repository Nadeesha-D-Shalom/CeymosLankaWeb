<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$q = $conn->query("
    SELECT 
        id,
        title,
        description,
        net_weight,
        image
    FROM rice_products
    ORDER BY created_at DESC, id DESC
");

$rows = [];
while ($row = $q->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
