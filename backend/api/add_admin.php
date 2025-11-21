<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$first = trim($data["first_name"]);
$last = trim($data["last_name"]);
$username = trim($data["username"]);
$email = trim($data["email"]);
$phone = trim($data["phone"]);
$password_raw = trim($data["password"]);
$dob = trim($data["dob"]);
$address = trim($data["address"]);
$role = trim($data["role"]);

// Prevent empty required fields
if ($first === "" || $last === "" || $username === "" || $email === "" || $phone === "" || $password_raw === "" || $dob === "" || $address === "") {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

// Auto-generate EMP ID
$res = $conn->query("SELECT MAX(id) AS last_id FROM admins");
$row = $res->fetch_assoc();
$next = ($row["last_id"] ?? 0) + 1;
$emp_id = "EMP" . str_pad($next, 3, "0", STR_PAD_LEFT);

// Validate DOB
$today = new DateTime();
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

// Hash password
$hashed_pw = password_hash($password_raw, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    INSERT INTO admins 
    (emp_id, first_name, last_name, username, email, phone, password, dob, address, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssssss",
    $emp_id,
    $first,
    $last,
    $username,
    $email,
    $phone,
    $hashed_pw,
    $dob,
    $address,
    $role
);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "emp_id" => $emp_id]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Database insert failed",
        "sql_error" => $stmt->error
    ]);
}
?>
