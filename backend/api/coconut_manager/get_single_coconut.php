<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data["id"] ?? 0);

$sql = "SELECT * FROM coconut_products WHERE id = $id LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "Product not found"]);
}
