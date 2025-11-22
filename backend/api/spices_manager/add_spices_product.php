<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

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
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = time() . "_" . uniqid() . "." . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName);
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
