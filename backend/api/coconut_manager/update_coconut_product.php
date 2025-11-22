<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$id = intval($_POST["id"]);
$title = $_POST["title"] ?? "";
$description = $_POST["description"] ?? "";
$net_weight = $_POST["net_weight"] ?? "";

$imageName = null;

// Handle image update
if (!empty($_FILES["image"]["name"])) {
    $folder = "../../uploads/coconut_products/";
    if (!is_dir($folder)) mkdir($folder, 0777, true);

    $imageName = time() . "_" . basename($_FILES["image"]["name"]);
    move_uploaded_file($_FILES["image"]["tmp_name"], $folder . $imageName);

    $updateImg = ", image='$imageName'";
} else {
    $updateImg = "";
}

$sql = "UPDATE coconut_products 
        SET title='$title', description='$description', net_weight='$net_weight' $updateImg
        WHERE id=$id";

$conn->query($sql);

echo json_encode(["success" => true]);
