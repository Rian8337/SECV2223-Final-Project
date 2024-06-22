<?php

require_once("../../Env.php");
require_once('../../db/Db.php');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit();
}

$db = new Db();

if ($db === null) {
    http_response_code(500);
    exit();
}

$user = null;

if (isset($_COOKIE["sessionId"])) {
    $user = $db->query(
        sprintf(
            "SELECT * FROM %s WHERE session_id = '%s'",
            Db::user_table,
            $db->escapeString($_COOKIE['sessionId'])
        )
    )->fetch_assoc();
} else {
    if (!isset($_POST["email"], $_POST["password"])) {
        http_response_code(400);
        exit();
    }

    // Check if email is valid
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        exit();
    }

    // Check if password is properly hashed
    if (strlen($_POST['password']) !== 64) {
        http_response_code(400);
        exit();
    }

    $user = $db->query(
        sprintf(
            "SELECT * FROM %s WHERE email = '%s'",
            Db::user_table,
            $db->escapeString($_POST['email'])
        )
    )->fetch_assoc();
}

if (!$user) {
    unset($_COOKIE["sessionId"]);
    setcookie("sessionId", "", -1);

    http_response_code(401);
    exit();
}

// Validate password if available
if (isset($_POST["password"]) && $user['password'] !== $_POST['password']) {
    http_response_code(401);
    exit();
}

$sessionId = isset($_POST["password"]) ? bin2hex(random_bytes(16)) : $user['session_id'];

// Invalidate login after 1 day
setcookie("sessionId", $sessionId, time() + 60 * 60 * 24, "", "", true, true);

if (isset($_POST["password"])) {
    $db->query(
        sprintf(
            "UPDATE %s SET session_id = '%s' WHERE id = %d",
            Db::user_table,
            $db->escapeString($sessionId),
            $user['id']
        )
    );
}

// Remove password from emitted JSON
unset($user['password']);

echo json_encode($user, JSON_NUMERIC_CHECK);
