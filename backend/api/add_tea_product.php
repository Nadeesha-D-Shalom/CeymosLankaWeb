<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../db.php");

// Helper to get POST safely
function field($name) {
    return isset($_POST[$name]) ? trim($_POST[$name]) : "";
}

$title          = field("title");
$tasting_notes  = field("tasting_notes");
$ingredients    = field("ingredients");
$tea_grade      = field("tea_grade");
$caffeine_level = field("caffeine_level");
$net_weight     = field("net_weight");

// Category auto: default 1
$category_id = 1;

// Basic validation
if ($title === "") {
    echo json_encode(["success" => false, "message" => "Title is required"]);
    exit;
}

// Handle image upload
$imageFileName = null;

if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
    $uploadDir  = "../uploads/"; // make sure this folder exists and is writable
    $tmpName    = $_FILES["image"]["tmp_name"];
    $origName   = basename($_FILES["image"]["name"]);
    $ext        = strtolower(pathinfo($origName, PATHINFO_EXTENSION));

    $allowed = ["jpg", "jpeg", "png", "webp"];
    if (!in_array($ext, $allowed)) {
        echo json_encode(["success" => false, "message" => "Invalid image type"]);
        exit;
    }

    $newName = "tea_" . time() . "_" . mt_rand(1000, 9999) . "." . $ext;
    $target  = $uploadDir . $newName;

    if (move_uploaded_file($tmpName, $target)) {
        $imageFileName = $newName;
    } else {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit;
    }
}

$stmt = $conn->prepare("
    INSERT INTO tea_products
    (title, tasting_notes, ingredients, tea_grade, caffeine_level, net_weight, image, category_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "sssssssi",
    $title,
    $tasting_notes,
    $ingredients,
    $tea_grade,
    $caffeine_level,
    $net_weight,
    $imageFileName,
    $category_id
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "id" => $stmt->insert_id]);
} else {
    echo json_encode(["success" => false, "message" => "Database insert failed"]);
}
?>
