<?php
include "../db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$description = $data["description"];
$category_id = $data["category_id"];
$price = $data["price"];
$image = $data["image"];
$stock = $data["stock"];

$sql = "INSERT INTO products (name, description, category_id, price, image, stock)
        VALUES ('$name', '$description', $category_id, $price, '$image', $stock)";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
