<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"]);

$stmt = $conn->prepare("SELECT id FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

echo json_encode([
    "exists" => $result->num_rows > 0
]);
?>
