<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";
require_once __DIR__ . "/../image_utils.php";

$title       = trim($_POST['title'] ?? "");
$description = trim($_POST['description'] ?? "");
$netWeight   = trim($_POST['net_weight'] ?? "");

if ($title === "") {
    echo json_encode(["success" => false, "message" => "Title is required"]);
    exit;
}

$uploadDir = __DIR__ . "/../../uploads/spices_products/";
if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

$imageName = null;

if (!empty($_FILES['image']['name'])) {
    $origExt = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $tempPath = $uploadDir . uniqid('spice_tmp_', true) . '.' . $origExt;
    if (move_uploaded_file($_FILES['image']['tmp_name'], $tempPath)) {
        $imageName = make_unique_webp_name('spice_', $uploadDir, $_FILES['image']['name']);
        $webpPath = $uploadDir . $imageName;
        $converted = convert_image_to_webp($tempPath, $webpPath, 80);
        if ($converted) @unlink($tempPath);
        else $imageName = basename($tempPath);
    }
}

$stmt = $conn->prepare("
    INSERT INTO spices_products (title, description, net_weight, image)
    VALUES (?, ?, ?, ?)
");

$stmt->bind_param("ssss", $title, $description, $netWeight, $imageName);
$ok = $stmt->execute();

echo json_encode([
    "success" => $ok,
    "message" => $ok ? "Spice product added" : "Insert failed",
    "id" => $stmt->insert_id,
    "image" => $imageName
]);
