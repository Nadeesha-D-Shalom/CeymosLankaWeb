<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data["username"]);

$stmt = $conn->prepare("SELECT id, email FROM admins WHERE username=? LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows !== 1) {
    echo json_encode(["success" => false, "message" => "Username not found"]);
    exit;
}

$row = $res->fetch_assoc();
$otp = rand(100000, 999999);

// Save OTP
$conn->query("UPDATE admins SET reset_otp='$otp' WHERE id=".$row["id"]);

// (You can send email — for now just return OTP response)
echo json_encode([
    "success" => true,
    "otp" => $otp // REMOVE for production
]);
?>
