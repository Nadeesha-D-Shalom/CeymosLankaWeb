<?php
header("Access-Control-Allow-Origin: *");
require_once __DIR__ . "/image_utils.php";

$uploadDir = __DIR__ . "/../uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!isset($_FILES["image"])) {
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
    exit;
}

$tmp = $_FILES["image"]["tmp_name"];
$origName = basename($_FILES["image"]["name"]);
$ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));

$allowed = ["jpg", "jpeg", "png", "webp"];
if (!in_array($ext, $allowed)) {
    echo json_encode(["success" => false, "message" => "Invalid file type"]);
    exit;
}

$tempName = $uploadDir . uniqid('upload_', true) . '.' . $ext;
if (!move_uploaded_file($tmp, $tempName)) {
    echo json_encode(["success" => false, "message" => "Move failed"]);
    exit;
}

$webpName = make_unique_webp_name('img', $uploadDir, $origName);
$webpPath = $uploadDir . $webpName;
$converted = convert_image_to_webp($tempName, $webpPath, 80);
if ($converted) {
    @unlink($tempName);
    echo json_encode([
        "success" => true,
        "file" => $webpName,
        "url" => "http://localhost/TeaWeb/backend/uploads/" . $webpName
    ]);
} else {
    // fallback to original
    echo json_encode([
        "success" => true,
        "file" => basename($tempName),
        "url" => "http://localhost/TeaWeb/backend/uploads/" . basename($tempName)
    ]);
}
?>
