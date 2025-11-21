<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"]);
$newPassword = password_hash(trim($data["newPassword"]), PASSWORD_DEFAULT);

// Update password
$stmt = $conn->prepare("UPDATE admins SET password = ? WHERE username = ?");
stmt->bind_param("ss", $newPassword, $username);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false
    ]);
}
?>
