<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";
require_once __DIR__ . "/../image_utils.php";

$title = $_POST["title"] ?? "";
$description = $_POST["description"] ?? "";
$net_weight = $_POST["net_weight"] ?? "";

$imageName = null;

// Upload image
if (!empty($_FILES["image"]["name"])) {
    $folder = "../../uploads/coconut_products/";
    if (!is_dir($folder)) mkdir($folder, 0777, true);

    $origExt = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $tempPath = $folder . uniqid('coconut_tmp_', true) . '.' . $origExt;
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $tempPath)) {
        $imageName = make_unique_webp_name('coconut_', $folder, $_FILES['image']['name']);
        $webpPath = $folder . $imageName;
        $converted = convert_image_to_webp($tempPath, $webpPath, 80);
        if ($converted) @unlink($tempPath);
        else $imageName = basename($tempPath);
    }
}

$sql = "INSERT INTO coconut_products (title, description, net_weight, image)
        VALUES ('$title', '$description', '$net_weight', '$imageName')";

$conn->query($sql);

echo json_encode(["success" => true]);
