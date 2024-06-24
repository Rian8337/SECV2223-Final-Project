<?php

require_once("../../core/Env.php");
require_once("../../db/Db.php");
require_once("../../core/PATCHOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_PATCH["password"])) {
    echo "Please enter a valid password.";
    http_response_code(400);
    exit();
}

// Check if password is properly hashed
if (strlen($_POST['password']) !== 64) {
    echo "Please enter a valid password.";
    http_response_code(400);
    exit();
}

$db = new Db();

$user = $db->query(
    sprintf(
        "SELECT id FROM %s WHERE session_id = '%s'",
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
        "UPDATE %s SET password = '%s' WHERE id = %d",
        Db::user_table,
        $db->escapeString($_PATCH["password"]),
        $user["id"]
    )
);

if (!$updateResult) {
    echo "Failed to update password. Please try again later.";
    http_response_code(500);
}
