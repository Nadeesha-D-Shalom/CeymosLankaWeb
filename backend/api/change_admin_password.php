<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$id              = intval($data["id"] ?? 0);
$currentPassword = trim($data["currentPassword"] ?? "");
$newPassword     = trim($data["newPassword"] ?? "");

if ($id <= 0 || $currentPassword === "" || $newPassword === "") {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

if (strlen($newPassword) < 6) {
    echo json_encode(["success" => false, "message" => "New password is too short"]);
    exit;
}

$stmt = $conn->prepare("SELECT password FROM admins WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows !== 1) {
    echo json_encode(["success" => false, "message" => "Admin not found"]);
    exit;
}

$row = $res->fetch_assoc();

if (!password_verify($currentPassword, $row["password"])) {
    echo json_encode(["success" => false, "message" => "Current password is incorrect"]);
    exit;
}

$newHash = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt2 = $conn->prepare("UPDATE admins SET password = ? WHERE id = ?");
$stmt2->bind_param("si", $newHash, $id);

if ($stmt2->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update password"]);
}
?>
