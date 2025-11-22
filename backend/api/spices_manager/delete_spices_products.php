<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

require_once __DIR__ . "/../../db.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);

if ($id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid ID"
    ]);
    exit;
}

$uploadDir = __DIR__ . "/../../uploads/spices_products/";

// Get image
$check = $conn->prepare("SELECT image FROM spices_products WHERE id = ?");
$check->bind_param("i", $id);
$check->execute();
$res = $check->get_result();
$image = $res && $res->num_rows > 0 ? $res->fetch_assoc()['image'] : null;
$check->close();

// Delete record
$stmt = $conn->prepare("DELETE FROM spices_products WHERE id = ?");
$stmt->bind_param("i", $id);
$ok = $stmt->execute();
$stmt->close();

// Delete file
if ($ok && $image && file_exists($uploadDir . $image)) {
    unlink($uploadDir . $image);
}

echo json_encode([
    "success" => $ok,
    "message" => $ok ? "Spice product deleted" : "Delete failed"
]);
