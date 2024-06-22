<?php

require_once("../../Env.php");
require_once('../../db/Db.php');

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo "Invalid request method.";
    http_response_code(405);
    exit();
}

if (!isset($_COOKIE["sessionId"]) || strlen($_COOKIE["sessionId"]) !== 64) {
    echo "Invalid session. Please log in again.";
    http_response_code(401);
    exit();
}

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

$query = sprintf(
    "SELECT * FROM %s WHERE family_id = %d",
    Db::todo_table,
    $user["family_id"]
);

// If searched title is set, filter by title.
if (isset($_GET["searchedTitle"])) {
    $query .= sprintf(" AND title LIKE '%s%'", $db->escapeString($_GET["searchedTitle"]));
}

$page = isset($_GET["page"]) ? intval($_GET["page"]) : 0;
$query .= " ORDER BY created_at DESC LIMIT " . $page * 20 . ", 10";

$todos = $db->query($query)->fetch_all(MYSQLI_ASSOC);

echo json_encode($todos, JSON_NUMERIC_CHECK);
