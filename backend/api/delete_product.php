<?php
include "../db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$id = $_GET["id"];

$sql = "DELETE FROM products WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
