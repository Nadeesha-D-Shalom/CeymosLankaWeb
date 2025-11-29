<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../../db.php";

$response = ["success" => true, "counts" => []];
$types = ["inbox", "spam", "deleted"];

foreach ($types as $t) {
    $stmt = $conn->prepare("SELECT COUNT(*) AS c FROM contact_messages WHERE status = ?");
    $stmt->bind_param("s", $t);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $response["counts"][$t] = intval($result["c"]);
}

echo json_encode($response);
