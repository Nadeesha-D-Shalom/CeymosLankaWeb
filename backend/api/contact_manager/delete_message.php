<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"]);

$stmt = $conn->prepare("DELETE FROM contact_messages WHERE id = ?");
$stmt->bind_param("i", $id);

echo json_encode(["success" => $stmt->execute()]);
