<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"]);
$password = trim($data["password"]);

if ($username === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "Username and password required."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, first_name, last_name, username, password, role 
     FROM admins 
     WHERE username = ? LIMIT 1"
);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $admin = $result->fetch_assoc();

    if (password_verify($password, $admin["password"])) {
        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $admin["id"],
                "username" => $admin["username"],
                "first_name" => $admin["first_name"],
                "last_name" => $admin["last_name"],
                "role" => $admin["role"]
            ]
        ]);
        exit;
    }

    echo json_encode([
        "success" => false,
        "message" => "Incorrect password"
    ]);
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "User not found"
]);
?>
