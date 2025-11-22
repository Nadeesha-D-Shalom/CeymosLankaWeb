<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$id = intval($_GET['id'] ?? 0);

$stmt = $conn->prepare("
    SELECT id, title, description, net_weight, image
    FROM rice_products WHERE id = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();

$res = $stmt->get_result();

if ($res->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Not found"]);
    exit;
}

echo json_encode(["success" => true, "product" => $res->fetch_assoc()]);
