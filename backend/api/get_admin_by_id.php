<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

if ($id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid admin ID"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, emp_id, first_name, last_name, username, email, phone, dob, address, role
     FROM admins
     WHERE id = ?"
);
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 1) {
    $admin = $res->fetch_assoc();
    echo json_encode([
        "success" => true,
        "admin" => $admin
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Admin not found"
    ]);
}
?>
