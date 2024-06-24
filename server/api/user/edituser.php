<?php

require_once("../../core/Env.php");
require_once("../../db/Db.php");
require_once("../../core/PATCHOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_PATCH["email"], $_PATCH["name"])) {
    echo "Please enter a valid email and name.";
    http_response_code(400);
    exit();
}

// Check if email is valid
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo "Please enter a valid email.";
    http_response_code(400);
    exit();
}

$db = new Db();

$user = $db->query(
    sprintf(
        "SELECT * FROM %s WHERE session_id = '%s'",
        Db::user_table,
        $db->escapeString($_COOKIE['sessionId'])
    )
)->fetch_assoc();

if (!$user) {
    unset($_COOKIE["sessionId"]);
    setcookie("sessionId", "", -1);

    echo "Invalid session. Please log in again.";
    http_response_code(401);
    exit();
}

$updateResult = $db->query(
    sprintf(
        "UPDATE %s SET email = '%s', name = '%s' WHERE id = %d",
        Db::user_table,
        $db->escapeString($_PATCH["email"]),
        $db->escapeString($_PATCH["name"]),
        $user["id"]
    )
);

if (!$updateResult) {
    echo "Failed to update user. Please try again later.";
    http_response_code(500);
    exit();
}

$user["email"] = $_PATCH["email"];
$user["name"] = $_PATCH["name"];

echo json_encode($user, JSON_NUMERIC_CHECK);
