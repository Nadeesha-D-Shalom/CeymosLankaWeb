<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$title = $_POST["title"] ?? "";
$description = $_POST["description"] ?? "";
$net_weight = $_POST["net_weight"] ?? "";

$imageName = null;

// Upload image
if (!empty($_FILES["image"]["name"])) {
    $folder = "../../uploads/coconut_products/";
    if (!is_dir($folder)) mkdir($folder, 0777, true);

    $imageName = time() . "_" . basename($_FILES["image"]["name"]);
    move_uploaded_file($_FILES["image"]["tmp_name"], $folder . $imageName);
}

$sql = "INSERT INTO coconut_products (title, description, net_weight, image)
        VALUES ('$title', '$description', '$net_weight', '$imageName')";

$conn->query($sql);

echo json_encode(["success" => true]);
