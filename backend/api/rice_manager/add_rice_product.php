<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../../db.php";

$title       = trim($_POST['title'] ?? "");
$description = trim($_POST['description'] ?? "");
$netWeight   = trim($_POST['net_weight'] ?? "");

if ($title === "") {
    echo json_encode(["success" => false, "message" => "Title is required"]);
    exit;
}

$uploadDir = __DIR__ . "/../../uploads/rice_products/";
if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

$imageName = null;

if (!empty($_FILES['image']['name'])) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imageName = time() . "_" . uniqid() . "." . $ext;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $imageName)) {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit;
    }
}

$stmt = $conn->prepare("
    INSERT INTO rice_products (title, description, net_weight, image)
    VALUES (?, ?, ?, ?)
");

$stmt->bind_param("ssss", $title, $description, $netWeight, $imageName);
$ok = $stmt->execute();

echo json_encode([
    "success" => $ok,
    "message" => $ok ? "Rice product added" : "Insert failed",
    "id" => $stmt->insert_id,
    "image" => $imageName
]);

$stmt->close();
