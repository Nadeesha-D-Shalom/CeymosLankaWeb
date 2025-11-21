<?php
// backend/api/tea_manager/update_tea_product.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../db.php";

$id            = isset($_POST['id']) ? intval($_POST['id']) : 0;
$title         = isset($_POST['title']) ? trim($_POST['title']) : "";
$tastingNotes  = isset($_POST['tasting_notes']) ? trim($_POST['tasting_notes']) : "";
$ingredients   = isset($_POST['ingredients']) ? trim($_POST['ingredients']) : "";
$teaGrade      = isset($_POST['tea_grade']) ? trim($_POST['tea_grade']) : "";
$netWeight     = isset($_POST['net_weight']) ? trim($_POST['net_weight']) : "";

if ($id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid product id"
    ]);
    exit;
}

// Get existing image
$currentImage = null;
$check = $conn->prepare("SELECT image FROM tea_products WHERE id = ?");
$check->bind_param("i", $id);
$check->execute();
$res = $check->get_result();
if ($res && $row = $res->fetch_assoc()) {
    $currentImage = $row['image'];
}
$check->close();

// Upload new image if provided
$uploadDir = __DIR__ . "/../../uploads/tea_products/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$newImage = $currentImage;

if (!empty($_FILES['image']['name'])) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $newImage = time() . "_" . uniqid() . "." . $ext;
    $targetPath = $uploadDir . $newImage;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
        echo json_encode([
            "success" => false,
            "message" => "Failed to upload new image"
        ]);
        exit;
    }

    // Optionally delete old image
    if ($currentImage && file_exists($uploadDir . $currentImage)) {
        @unlink($uploadDir . $currentImage);
    }
}

// Update record
$stmt = $conn->prepare("
    UPDATE tea_products
    SET
        title = ?,
        tasting_notes = ?,
        ingredients = ?,
        tea_grade = ?,
        net_weight = ?,
        image = ?
    WHERE id = ?
");

$stmt->bind_param(
    "ssssssi",
    $title,
    $tastingNotes,
    $ingredients,
    $teaGrade,
    $netWeight,
    $newImage,
    $id
);

$ok = $stmt->execute();

if (!$ok) {
    echo json_encode([
        "success" => false,
        "message" => "Update failed",
        "error"   => $stmt->error
    ]);
} else {
    echo json_encode([
        "success" => true,
        "message" => "Tea product updated successfully"
    ]);
}

$stmt->close();
