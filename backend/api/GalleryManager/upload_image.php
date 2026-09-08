<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../../db.php";
require_once __DIR__ . "/../image_utils.php";

if (!isset($_FILES["images"])) {
    echo json_encode(["success" => false, "message" => "No images uploaded"]);
    exit;
}

$uploadDir = "../../uploads/gallery/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$files = $_FILES["images"];
$count = count($files["name"]);

$successCount = 0;
$errors = [];

for ($i = 0; $i < $count; $i++) {
    if ($files["error"][$i] !== UPLOAD_ERR_OK) {
        $errors[] = $files["name"][$i] . " failed to upload.";
        continue;
    }

    $originalName = $files["name"][$i];
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    // Basic validation
    if (!in_array($ext, ["jpg", "jpeg", "png", "webp"])) {
        $errors[] = $originalName . " has invalid file type.";
        continue;
    }

    $tempName = $uploadDir . uniqid('g_', true) . '.' . $ext;
    if (!move_uploaded_file($files["tmp_name"][$i], $tempName)) {
        $errors[] = $originalName . " failed to move.";
        continue;
    }

    $webpName = make_unique_webp_name('gallery_', $uploadDir, $originalName);
    $webpPath = $uploadDir . $webpName;
    $converted = convert_image_to_webp($tempName, $webpPath, 80);
    if ($converted) {
        @unlink($tempName);
        $dbPath = "uploads/gallery/" . $webpName;
    } else {
        // fallback to original file name
        $dbPath = "uploads/gallery/" . basename($tempName);
    }

    $stmt = $conn->prepare(
        "INSERT INTO gallery_images (image_path, original_name) VALUES (?, ?)"
    );
    $stmt->bind_param("ss", $dbPath, $originalName);
    $stmt->execute();

    $successCount++;
}

echo json_encode([
    "success" => $successCount > 0,
    "uploaded" => $successCount,
    "errors" => $errors
]);
