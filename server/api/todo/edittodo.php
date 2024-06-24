<?php

require_once("../../core/Env.php");
require_once("../../db/Db.php");
require_once("../../core/PATCHOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_PATCH["id"])) {
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
        $db->escapeString($_PATCH["id"])
    )
)->fetch_assoc();

if (!$todo) {
    echo "Todo not found.";
    http_response_code(404);
    exit();
}

// Check if user is authorized to edit todo
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
    echo "You do not have the permission to edit this todo.";
    http_response_code(403);
    exit();
}

// Update todo
$updates = [];

if (isset($_PATCH["title"])) {
    $updates[] = sprintf("title = '%s'", $db->escapeString($_PATCH["title"]));
}

if (isset($_PATCH["description"])) {
    $updates[] = sprintf("description = '%s'", $db->escapeString($_PATCH["description"]));
}

if (isset($_PATCH["completed"])) {
    $updates[] = sprintf("completed = %d", intval($_PATCH["completed"]));
}

if (count($updates) === 0) {
    echo "No updates provided.";
    http_response_code(400);
    exit();
}

$updateResult = $db->query(
    sprintf(
        "UPDATE %s SET %s WHERE id = %d",
        Db::todo_table,
        implode(", ", $updates),
        $todo["id"]
    )
);

if (!$updateResult) {
    echo "Failed to update todo.";
    http_response_code(500);
    exit();
}

// Obtain the updated todo structure
$todo = $db->query(
    sprintf(
        "SELECT id, title, description, created_at, completed, user_id FROM %s WHERE id = %d",
        Db::todo_table,
        $todo["id"]
    )
)->fetch_assoc();

if (!$todo) {
    echo "Failed to find todo.";
    http_response_code(500);
    exit();
}

// Replace user ID with the user who created the todo
$todoCreator = $db->query(
    sprintf(
        "SELECT name FROM %s WHERE id = %d",
        Db::user_table,
        $todo["user_id"]
    )
)->fetch_assoc();

if (!$todoCreator) {
    echo "Failed to find user.";
    http_response_code(500);
    exit();
}

$todo["user"] = array(
    "id" => $todo["user_id"],
    "name" => $todoCreator["name"]
);

unset($todo["user_id"]);

echo json_encode($todo, JSON_NUMERIC_CHECK);
