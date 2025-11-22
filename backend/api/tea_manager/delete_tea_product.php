<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

// Read JSON or normal POST
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$id = 0;

// Check JSON first
if ($data && isset($data["id"])) {
    $id = intval($data["id"]);
}

// Check POST as fallback
if ($id <= 0 && isset($_POST["id"])) {
    $id = intval($_POST["id"]);
}

if ($id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid or missing product ID"
    ]);
    exit;
}

// Get stored image
$uploadDir = __DIR__ . "/../../uploads/tea_products/";
$currentImage = null;

$check = $conn->prepare("SELECT image FROM tea_products WHERE id = ?");
$check->bind_param("i", $id);
$check->execute();
$res = $check->get_result();

if ($res && $row = $res->fetch_assoc()) {
    $currentImage = $row["image"];
}
$check->close();

// Delete from database
$stmt = $conn->prepare("DELETE FROM tea_products WHERE id = ?");
$stmt->bind_param("i", $id);
$ok = $stmt->execute();
$stmt->close();

if (!$ok) {
    echo json_encode([
        "success" => false,
        "message" => "Database delete failed",
        "error"   => $stmt->error
    ]);
    exit;
}

// Delete image
if ($currentImage && file_exists($uploadDir . $currentImage)) {
    unlink($uploadDir . $currentImage);
}

echo json_encode([
    "success" => true,
    "message" => "Tea product deleted successfully"
]);
