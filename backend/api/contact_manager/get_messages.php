<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../../db.php";

$status = $_GET["status"] ?? "inbox";

$stmt = $conn->prepare("SELECT id, full_name, email, subject, message, status, created_at 
                        FROM contact_messages 
                        WHERE status = ? 
                        ORDER BY created_at DESC");
$stmt->bind_param("s", $status);
$stmt->execute();

$res = $stmt->get_result();
$messages = [];

while ($row = $res->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode(["success" => true, "messages" => $messages]);
