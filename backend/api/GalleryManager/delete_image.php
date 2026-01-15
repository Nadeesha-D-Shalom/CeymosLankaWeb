<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../../db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["success" => false]);
    exit;
}

$id = intval($data["id"]);

$stmt = $conn->prepare("SELECT image_path FROM gallery_images WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

if (!$result) {
    echo json_encode(["success" => false]);
    exit;
}

$filePath = "../../" . $result["image_path"];
if (file_exists($filePath)) {
    unlink($filePath);
}

$del = $conn->prepare("DELETE FROM gallery_images WHERE id = ?");
$del->bind_param("i", $id);
$del->execute();

echo json_encode(["success" => true]);
