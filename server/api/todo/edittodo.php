<?php

require_once("../../core/Env.php");
require_once("../../core/Db.php");
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

if (isset($_PATCH["due_date"])) {
    $dueDate = strtotime($_PATCH["due_date"]);

    if ($dueDate === false) {
        echo "Invalid due date.";
        http_response_code(400);
        exit();
    }

    $updates[] = sprintf("due_date = FROM_UNIXTIME(%d)", $dueDate);
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

// Obtain the completely updated todo structure
$todo = $db->query(
    sprintf(
        "SELECT * FROM %s WHERE id = %d",
        Db::todo_table,
        $todo["id"]
    )
)->fetch_assoc();

if (!$todo) {
    echo "Failed to find todo.";
    http_response_code(500);
    exit();
}

echo json_encode($todo, JSON_NUMERIC_CHECK);
