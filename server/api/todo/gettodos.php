<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/GETOnly.php");
require_once("../../core/CheckCookie.php");

$db = new Db();
$user = $db->query(
    sprintf(
        "SELECT family_id FROM %s WHERE session_id = '%s'",
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

$page = isset($_GET["page"]) ? intval($_GET["page"]) - 1 : 0;

if ($page < 0) {
    echo "Invalid page number.";
    http_response_code(400);
    exit();
}

$query = sprintf(
    "SELECT id, title, description, created_at, completed, user_id FROM %s WHERE family_id = %d",
    Db::todo_table,
    $user["family_id"]
);

// If completed is set, filter by completed.
if (isset($_GET["completed"])) {
    $query .= sprintf(" AND completed = %d", intval($_GET["completed"]));
}

// If searched title is set, filter by title.
if (isset($_GET["title"])) {
    $query .= sprintf(" AND title LIKE '%s%%'", $db->escapeString($_GET["title"]));
}

$query .= " ORDER BY created_at DESC LIMIT " . $page * 10 . ", 10";

$todos = $db->query($query)->fetch_all(MYSQLI_ASSOC);

// Replace user IDs with users who created the todos
$todoCreators = $db->query(
    sprintf(
        "SELECT id, name FROM %s WHERE family_id = %d",
        Db::user_table,
        $user["family_id"]
    )
)->fetch_all(MYSQLI_ASSOC);

foreach ($todos as &$todo) {
    foreach ($todoCreators as $creator) {
        if ($creator["id"] === $todo["user_id"]) {
            $todo["user"] = array(
                "id" => $creator["id"],
                "name" => $creator["name"]
            );

            unset($todo["user_id"]);

            break;
        }
    }
}

echo json_encode($todos, JSON_NUMERIC_CHECK);
