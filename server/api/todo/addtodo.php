<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/PUTOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_PUT["title"])) {
    echo "Please enter a valid title.";
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

if (!isset($user["family_id"])) {
    echo "You are not part of a family. Please create or join a family first.";
    http_response_code(403);
    exit();
}

// Optionally add description and due date (both default to null)
// Description may contain multiple words
// Insert due date as unix timestamp
$description = "NULL";
if (isset($_PUT["description"])) {
    $description = sprintf("'%s'", $db->escapeString($_PUT["description"]));
}

$dueDate = "NULL";
if (isset($_PUT["due_date"])) {
    $dueDate = strtotime($_PUT["due_date"]);

    if ($dueDate === false) {
        http_response_code(400);
        exit();
    }

    $dueDate = sprintf("FROM_UNIXTIME(%d)", $dueDate);
}

$insertResult = $db->query(
    sprintf(
        "INSERT INTO %s (title, description, due_date, user_id, family_id) VALUES ('%s', %s, %s, %d, %d)",
        Db::todo_table,
        $db->escapeString($_PUT["title"]),
        $description,
        $dueDate,
        $user["id"],
        $user["family_id"]
    )
);

if (!$insertResult) {
    echo "Failed to add todo. Please try again later.";
    http_response_code(500);
    exit();
}

$todo = $db->query(
    sprintf(
        "SELECT id, title, description, due_date, user_id FROM %s WHERE id = %d",
        Db::todo_table,
        $db->getDbConnection()->insert_id
    )
)->fetch_assoc();

http_response_code(201);
echo json_encode($todo, JSON_NUMERIC_CHECK);
