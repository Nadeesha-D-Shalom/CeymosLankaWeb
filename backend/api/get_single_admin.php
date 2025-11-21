<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"];

$stmt = $conn->prepare("
    SELECT id, emp_id, first_name, last_name, username, email, phone, dob, address, role
    FROM admins
    WHERE id = ?
    LIMIT 1
");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 1) {
    echo json_encode([
        "success" => true,
        "admin" => $res->fetch_assoc()
    ]);
    exit;
}

echo json_encode(["success" => false, "message" => "Admin not found"]);
?>
