<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once "../../db.php";

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

    $newName = uniqid("gallery_", true) . "." . $ext;
    $targetPath = $uploadDir . $newName;

    if (!move_uploaded_file($files["tmp_name"][$i], $targetPath)) {
        $errors[] = $originalName . " failed to move.";
        continue;
    }

    $dbPath = "uploads/gallery/" . $newName;

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
