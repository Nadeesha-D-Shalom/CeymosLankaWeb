<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../db.php");

// For simplicity, using php://input JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$id = intval($data["id"]);

// Find existing image
$imgQuery = $conn->prepare("SELECT image FROM tea_products WHERE id = ?");
$imgQuery->bind_param("i", $id);
$imgQuery->execute();
$imgRes = $imgQuery->get_result();

$imageFile = null;
if ($imgRes && $imgRes->num_rows === 1) {
    $row = $imgRes->fetch_assoc();
    $imageFile = $row["image"];
}

// Delete DB row
$stmt = $conn->prepare("DELETE FROM tea_products WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    // Optionally delete image
    if ($imageFile) {
        $path = "../uploads/" . $imageFile;
        if (file_exists($path)) {
            @unlink($path);
        }
    }
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Delete failed"]);
}
?>
