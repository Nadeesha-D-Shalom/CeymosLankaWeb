<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../db.php");

function field($name) {
    return isset($_POST[$name]) ? trim($_POST[$name]) : "";
}

$id             = isset($_POST["id"]) ? intval($_POST["id"]) : 0;
$title          = field("title");
$tasting_notes  = field("tasting_notes");
$ingredients    = field("ingredients");
$tea_grade      = field("tea_grade");
$caffeine_level = field("caffeine_level");
$net_weight     = field("net_weight");

if ($id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid product ID"]);
    exit;
}
if ($title === "") {
    echo json_encode(["success" => false, "message" => "Title is required"]);
    exit;
}

// Current image
$currentImage = null;
$res = $conn->prepare("SELECT image FROM tea_products WHERE id = ?");
$res->bind_param("i", $id);
$res->execute();
$resResult = $res->get_result();
if ($resResult && $resResult->num_rows === 1) {
    $row = $resResult->fetch_assoc();
    $currentImage = $row["image"];
}

// Handle new image if provided
$imageFileName = $currentImage;

if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
    $uploadDir  = "../uploads/";
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
        // Optionally delete old image
        if ($currentImage && file_exists($uploadDir . $currentImage)) {
            @unlink($uploadDir . $currentImage);
        }
        $imageFileName = $newName;
    } else {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit;
    }
}

$stmt = $conn->prepare("
    UPDATE tea_products
    SET title = ?, tasting_notes = ?, ingredients = ?,
        tea_grade = ?, caffeine_level = ?, net_weight = ?, image = ?
    WHERE id = ?
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
    $id
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}
?>
