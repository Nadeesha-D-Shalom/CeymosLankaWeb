<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "../../db.php";

$input = json_decode(file_get_contents("php://input"), true);

$full_name = trim($input["full_name"] ?? "");
$phone     = trim($input["phone"] ?? "");
$email     = trim($input["email"] ?? "");
$subject   = trim($input["subject"] ?? "");
$message   = trim($input["message"] ?? "");
$status    = "inbox"; // default status

$stmt = $conn->prepare("
 INSERT INTO contact_messages 
 (full_name, phone, email, subject, message, status) 
 VALUES (?,?,?,?,?,?)
");

$stmt->bind_param("ssssss", $full_name, $phone, $email, $subject, $message, $status);

$ok = $stmt->execute();
$error = $stmt->error;

echo json_encode([
    "success" => $ok,
    "sql_error" => $error,
    "input_data" => $input
]);
    