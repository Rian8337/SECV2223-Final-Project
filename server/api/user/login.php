<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');

$db = new Db();
$user = null;

if (isset($_COOKIE["sessionId"])) {
    require_once("../../core/CheckCookie.php");

    $user = $db->query(
        sprintf(
            "SELECT * FROM %s WHERE session_id = '%s'",
            Db::user_table,
            $db->escapeString($_COOKIE['sessionId'])
        )
    )->fetch_assoc();
} else {
    if (!isset($_POST["email"], $_POST["password"])) {
        echo "Invalid email or password.";
        http_response_code(400);
        exit();
    }

    // Check if email is valid
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email or password.";
        http_response_code(400);
        exit();
    }

    // Check if password is properly hashed
    if (strlen($_POST['password']) !== 64) {
        echo "Invalid email or password.";
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
    if (isset($_COOKIE["sessionId"])) {
        echo "Invalid session. Please log in again.";
    } else {
        echo "Invalid email or password.";
    }

    unset($_COOKIE["sessionId"]);
    setcookie("sessionId", "", -1);

    http_response_code(401);
    exit();
}

// Validate password if available
if (isset($_POST["password"]) && $user['password'] !== $_POST['password']) {
    echo "Invalid email or password.";
    http_response_code(401);
    exit();
}

$sessionId = isset($_POST["password"]) ? bin2hex(random_bytes(32)) : $user['session_id'];

// Invalidate login after 1 day
setcookie("sessionId", $sessionId, time() + 60 * 60 * 24, "/", "", true, true);

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
