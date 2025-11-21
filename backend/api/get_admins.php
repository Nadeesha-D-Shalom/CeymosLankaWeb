<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../db.php");

$sql = "SELECT id, emp_id, first_name, last_name, username, email, phone, dob, address, role, created_at
        FROM admins ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

$admins = [];

while ($row = mysqli_fetch_assoc($result)) {
    $admins[] = $row;
}

echo json_encode($admins);
?>
