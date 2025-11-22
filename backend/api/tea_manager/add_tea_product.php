<?php
// backend/api/tea_manager/add_tea_product.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../db.php";

// Basic validation
$title         = isset($_POST['title']) ? trim($_POST['title']) : "";
$tastingNotes  = isset($_POST['tasting_notes']) ? trim($_POST['tasting_notes']) : "";
$ingredients   = isset($_POST['ingredients']) ? trim($_POST['ingredients']) : "";
$teaGrade      = isset($_POST['tea_grade']) ? trim($_POST['tea_grade']) : "";
$netWeight     = isset($_POST['net_weight']) ? trim($_POST['net_weight']) : "";

if ($title === "") {
    echo json_encode([
        "success" => false,
        "message" => "Title is required"
    ]);
    exit;
}

// Handle image upload
$imageName = null;
$uploadDir = __DIR__ . "/../../uploads/tea_products/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (!empty($_FILES['image']['name'])) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = time() . "_" . uniqid() . "." . $ext;
    $targetPath = $uploadDir . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
        echo json_encode([
            "success" => false,
            "message" => "Failed to upload image"
        ]);
        exit;
    }
}

// Insert (category_id = 1 for tea)
$stmt = $conn->prepare("
    INSERT INTO tea_products
        (title, tasting_notes, ingredients, tea_grade, net_weight, image, category_id)
    VALUES (?, ?, ?, ?, ?, ?, 1)
");

$stmt->bind_param(
    "ssssss",
    $title,
    $tastingNotes,
    $ingredients,
    $teaGrade,
    $netWeight,
    $imageName
);

$ok = $stmt->execute();

if (!$ok) {
    echo json_encode([
        "success" => false,
        "message" => "Insert failed",
        "error"   => $stmt->error
    ]);
} else {
    echo json_encode([
        "success" => true,
        "message" => "Tea product added successfully",
        "id"      => $stmt->insert_id,
        "image"   => $imageName
    ]);
}

$stmt->close();
