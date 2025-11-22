<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . "/../../db.php";

$id          = intval($_POST['id'] ?? 0);
$title       = trim($_POST['title'] ?? "");
$description = trim($_POST['description'] ?? "");
$netWeight   = trim($_POST['net_weight'] ?? "");

$uploadDir = __DIR__ . "/../../uploads/rice_products/";

$check = $conn->prepare("SELECT image FROM rice_products WHERE id = ?");
$check->bind_param("i", $id);
$check->execute();
$currentImage = $check->get_result()->fetch_assoc()['image'] ?? null;
$check->close();

$newImage = $currentImage;

if (!empty($_FILES['image']['name'])) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $newImage = time() . "_" . uniqid() . "." . $ext;

    move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $newImage);

    if ($currentImage && file_exists($uploadDir . $currentImage)) {
        unlink($uploadDir . $currentImage);
    }
}

$stmt = $conn->prepare("
    UPDATE rice_products
    SET title = ?, description = ?, net_weight = ?, image = ?
    WHERE id = ?
");

$stmt->bind_param("ssssi", $title, $description, $netWeight, $newImage, $id);
$ok = $stmt->execute();

echo json_encode([
    "success" => $ok,
    "message" => $ok ? "Rice product updated" : "Update failed"
]);
