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

$id         = intval($data["id"] ?? 0);
$first_name = trim($data["first_name"] ?? "");
$last_name  = trim($data["last_name"] ?? "");
$email      = trim($data["email"] ?? "");
$phone      = trim($data["phone"] ?? "");
$dob        = trim($data["dob"] ?? "");
$address    = trim($data["address"] ?? "");

if ($id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid admin ID"]);
    exit;
}

if ($first_name === "" || $last_name === "" || $email === "") {
    echo json_encode(["success" => false, "message" => "First name, last name, and email are required"]);
    exit;
}

// Validate DOB (same logic as add_admin)
if (strtotime($dob) === false) {
    echo json_encode(["success" => false, "message" => "Invalid DOB"]);
    exit;
}

$today   = new DateTime();
$dobDate = new DateTime($dob);

if ($dobDate > $today) {
    echo json_encode(["success" => false, "message" => "DOB cannot be in the future"]);
    exit;
}

$age = $today->diff($dobDate)->y;
if ($age < 18) {
    echo json_encode(["success" => false, "message" => "Admin must be at least 18"]);
    exit;
}

// Update profile (do not change username, emp_id, role here)
$stmt = $conn->prepare("
    UPDATE admins
    SET first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, address = ?
    WHERE id = ?
");
$stmt->bind_param(
    "ssssssi",
    $first_name,
    $last_name,
    $email,
    $phone,
    $dob,
    $address,
    $id
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}
?>
