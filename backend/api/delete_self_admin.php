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

$id       = intval($data["id"] ?? 0);
$password = trim($data["password"] ?? "");

if ($id <= 0 || $password === "") {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

$stmt = $conn->prepare("SELECT role, password FROM admins WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows !== 1) {
    echo json_encode(["success" => false, "message" => "Admin not found"]);
    exit;
}

$admin = $res->fetch_assoc();

if ($admin["role"] === "Super Admin") {
    echo json_encode([
        "success" => false,
        "message" => "Super Admin accounts cannot be deleted."
    ]);
    exit;
}

if (!password_verify($password, $admin["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Incorrect password"
    ]);
    exit;
}

$stmt2 = $conn->prepare("DELETE FROM admins WHERE id = ?");
$stmt2->bind_param("i", $id);

if ($stmt2->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Delete failed"]);
}
?>
