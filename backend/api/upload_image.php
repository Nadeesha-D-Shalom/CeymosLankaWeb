<?php
header("Access-Control-Allow-Origin: *");

$uploadDir = "../uploads/";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileName = basename($_FILES["image"]["name"]);
$targetPath = $uploadDir . $fileName;

if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
    echo json_encode([
        "success" => true,
        "file" => $fileName,
        "url" => "http://localhost/TeaWeb/backend/uploads/" . $fileName
    ]);
} else {
    echo json_encode(["success" => false]);
}
?>
