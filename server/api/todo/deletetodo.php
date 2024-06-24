<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/DELETEOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_DELETE["id"])) {
    echo "Please enter a valid ID.";
    http_response_code(400);
    exit();
}

$db = new Db();

// Check if todo exists
$todo = $db->query(
    sprintf(
        "SELECT * FROM %s WHERE id = %d",
        Db::todo_table,
        $db->escapeString($_DELETE["id"])
    )
)->fetch_assoc();

if (!$todo) {
    echo "Todo not found.";
    http_response_code(404);
    exit();
}

// Check if user is authorized to delete todo
$user = $db->query(
    sprintf(
        "SELECT id, family_id FROM %s WHERE session_id = '%s'",
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

if (!isset($user["family_id"])) {
    echo "You are not part of a family.";
    http_response_code(403);
    exit();
}

if ($todo["family_id"] !== $user["family_id"]) {
    echo "You do not have the permission to delete this todo.";
    http_response_code(403);
    exit();
}

$deleteResult = $db->query(
    sprintf(
        "DELETE FROM %s WHERE id = %d",
        Db::todo_table,
        $todo["id"]
    )
);

if (!$deleteResult) {
    echo "Failed to delete todo.";
    http_response_code(500);
    exit();
}

http_response_code(204);
