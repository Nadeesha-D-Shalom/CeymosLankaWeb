<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

// Required fields
$id         = $data["id"];
$first_name = $data["first_name"];
$last_name  = $data["last_name"];
$email      = $data["email"];
$phone      = $data["phone"];
$dob        = $data["dob"];
$address    = $data["address"];
$role       = $data["role"];      // requested role
$username   = $data["username"];  // must remain unchanged
$emp_id     = $data["emp_id"];    // must remain unchanged

// Logged-in admin for permission check
$logged_role = $_SERVER["HTTP_ADMIN_ROLE"] ?? ""; 
// You can also use session if needed.


// VALIDATION --------------------------------------------------

if (empty($id)) {
    echo json_encode(["success" => false, "message" => "Missing admin ID"]);
    exit;
}

// DOB validation
if (empty($dob)) {
    echo json_encode(["success" => false, "message" => "DOB required"]);
    exit;
}

$today = new DateTime();
$dobDate = new DateTime($dob);
$age = $today->diff($dobDate)->y;

if ($dobDate > $today) {
    echo json_encode(["success" => false, "message" => "DOB cannot be in the future"]);
    exit;
}

if ($age < 18) {
    echo json_encode(["success" => false, "message" => "Admin must be at least 18 years old"]);
    exit;
}


// ROLE UPDATE RULE --------------------------------------------
if ($logged_role !== "Super Admin") {
    // force normal admin to keep original role
    $role = "Admin";
}


// UPDATE QUERY -------------------------------------------------

$stmt = $conn->prepare("
    UPDATE admins SET 
        first_name = ?, 
        last_name = ?, 
        email = ?, 
        phone = ?, 
        dob = ?, 
        address = ?, 
        role = ?
    WHERE id = ?
");

$stmt->bind_param(
    "sssssssi",
    $first_name,
    $last_name,
    $email,
    $phone,
    $dob,
    $address,
    $role,
    $id
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}
?>
