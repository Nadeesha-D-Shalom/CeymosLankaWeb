<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../../db.php";

$result = $conn->query(
    "SELECT id, image_path, created_at FROM gallery_images ORDER BY id DESC"
);

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[] = $row;
}

echo json_encode($images);
