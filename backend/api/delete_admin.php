<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

// Debug log (optional)
file_put_contents("debug_delete.txt", print_r($data, true));

$delete_id = $data["delete_id"];
$admin_id  = $data["admin_id"];   // Logged-in admin ID
$password  = $data["password"];

// Fetch logged-in admin details
$stmt = $conn->prepare("SELECT role, password FROM admins WHERE id = ?");
$stmt->bind_param("i", $admin_id);
$stmt->execute();
$res1 = $stmt->get_result();

if ($res1->num_rows !== 1) {
    echo json_encode(["success" => false, "message" => "Logged admin not found"]);
    exit;
}

$loggedAdmin = $res1->fetch_assoc();
$loggedRole  = $loggedAdmin["role"];

// Verify password
if (!password_verify($password, $loggedAdmin["password"])) {
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
    exit;
}

// Prevent deleting yourself
if ($admin_id == $delete_id) {
    echo json_encode(["success" => false, "message" => "You cannot delete yourself"]);
    exit;
}

// Fetch role of the admin being deleted
$stmt2 = $conn->prepare("SELECT role FROM admins WHERE id = ?");
$stmt2->bind_param("i", $delete_id);
$stmt2->execute();
$res2 = $stmt2->get_result();

if ($res2->num_rows !== 1) {
    echo json_encode(["success" => false, "message" => "Admin record not found"]);
    exit;
}

$targetAdmin = $res2->fetch_assoc();
$targetRole  = $targetAdmin["role"];

// ❌ Normal Admin cannot delete Super Admin
if ($loggedRole !== "Super Admin" && $targetRole === "Super Admin") {
    echo json_encode([
        "success" => false,
        "message" => "Permission denied. Only Super Admins can delete Super Admin accounts."
    ]);
    exit;
}

// FINAL DELETE
$stmt3 = $conn->prepare("DELETE FROM admins WHERE id = ?");
$stmt3->bind_param("i", $delete_id);

if ($stmt3->execute()) {
    echo json_encode(["success" => true]);
    exit;
}

echo json_encode(["success" => false, "message" => "Delete failed"]);
?>
