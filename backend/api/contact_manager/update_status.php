<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"]);
$status = $data["status"];

$stmt = $conn->prepare("UPDATE contact_messages SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $id);

echo json_encode(["success" => $stmt->execute()]);
