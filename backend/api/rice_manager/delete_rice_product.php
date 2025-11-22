<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$id = intval($data["id"] ?? 0);

if ($id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid product ID"
    ]);
    exit;
}

$uploadDir = __DIR__ . "/../../uploads/rice_products/";

/* Fetch image */
$stmt = $conn->prepare("SELECT image FROM rice_products WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();
$row = $res->fetch_assoc();
$stmt->close();

$image = $row["image"] ?? null;

/* Delete record */
$stmt = $conn->prepare("DELETE FROM rice_products WHERE id = ?");
$stmt->bind_param("i", $id);
$ok = $stmt->execute();
$stmt->close();

if ($ok) {
    if ($image && file_exists($uploadDir . $image)) {
        unlink($uploadDir . $image);
    }

    echo json_encode([
        "success" => true,
        "message" => "Rice product deleted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Delete failed"
    ]);
}
