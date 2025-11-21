<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"]);

// OTP verification step
if (!empty($data["otp"]) && empty($data["change"])) {

    $otp = trim($data["otp"]);

    $stmt = $conn->prepare("SELECT id, reset_otp FROM admins WHERE username=? LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows !== 1) {
        echo json_encode(["success" => false, "message" => "Invalid username"]);
        exit;
    }

    $row = $res->fetch_assoc();

    if ($row["reset_otp"] != $otp) {
        echo json_encode(["success" => false, "message" => "Incorrect OTP"]);
        exit;
    }

    echo json_encode(["success" => true]);
    exit;
}

// Final password change
if (!empty($data["change"])) {

    $new = password_hash($data["newPassword"], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("UPDATE admins SET password=?, reset_otp=NULL WHERE username=?");
    $stmt->bind_param("ss", $new, $username);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }
}
?>
