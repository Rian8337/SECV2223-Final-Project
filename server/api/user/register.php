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

if (!isset($_POST["name"], $_POST["email"], $_POST["password"])) {
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

// Check if email is registered
if ($db->query(
    sprintf(
        "SELECT id FROM %s WHERE email = '%s'",
        Db::user_table,
        $db->escapeString($_POST['email'])
    )
)->fetch_assoc()) {
    http_response_code(409);
    exit();
}

$sessionId = bin2hex(random_bytes(64));

$result = $db->query(
    sprintf(
        "INSERT INTO %s (name, email, password, session_id) VALUES ('%s', '%s', '%s', '%s')",
        Db::user_table,
        $db->escapeString($_POST['name']),
        $db->escapeString($_POST['email']),
        $db->escapeString($_POST['password']),
        $db->escapeString($sessionId)
    )
);

if (!$result) {
    http_response_code(500);
    exit();
}

$user = $db->query(
    sprintf(
        "SELECT id, name, family_id FROM %s WHERE email = '%s'",
        Db::user_table,
        $db->escapeString($_POST['email'])
    )
)->fetch_assoc();

// Invalidate login after 1 day
setcookie("sessionId", $sessionId, time() + 60 * 60 * 24, "", "", true, true);

echo json_encode($user, JSON_NUMERIC_CHECK);
