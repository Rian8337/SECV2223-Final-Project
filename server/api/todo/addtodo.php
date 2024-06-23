<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/POSTOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_POST["title"])) {
    echo "Please enter a valid title.";
    http_response_code(400);
    exit();
}

$db = new Db();
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
    echo "You are not part of a family. Please create or join a family first.";
    http_response_code(403);
    exit();
}

// Optionally add description, where the description may contain multiple words
$description = "NULL";
if (isset($_POST["description"])) {
    $description = sprintf("'%s'", $db->escapeString($_POST["description"]));
}

$insertResult = $db->query(
    sprintf(
        "INSERT INTO %s (title, description, user_id, family_id) VALUES ('%s', %s, %d, %d)",
        Db::todo_table,
        $db->escapeString($_POST["title"]),
        $description,
        $user["id"],
        $user["family_id"]
    )
);

if (!$insertResult) {
    echo "Failed to add todo. Please try again later.";
    http_response_code(500);
    exit();
}

// Obtain the newly added todo structure, with creation date converted to ISO-8601 string format
$todo = $db->query(
    sprintf(
        "SELECT id, title, description, created_at, user_id FROM %s WHERE id = %d",
        Db::todo_table,
        $db->getDbConnection()->insert_id
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

http_response_code(201);
echo json_encode($todo, JSON_NUMERIC_CHECK);
