<?php
require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/PATCHOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_PATCH["name"])) {
    echo "Please enter a family name.";
    http_response_code(400);
    exit();
}

if (strlen($_PATCH["name"]) < 3) {
    echo "Family name must be at least 3 characters long.";
    http_response_code(400);
    exit();
}

if (strlen($_PATCH["name"]) > 255) {
    echo "Family name must be at most 255 characters long.";
    http_response_code(400);
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
    echo "You are not part of a family.";
    http_response_code(403);
    exit();
}

// Obtain user family
$family = $db->query(
    sprintf(
        "SELECT * FROM %s WHERE id = %d",
        Db::family_table,
        $user["family_id"]
    )
)->fetch_assoc();

if (!$family) {
    echo "Failed to find family.";
    http_response_code(500);
    exit();
}

$updateResult = $db->query(
    sprintf(
        "UPDATE %s SET name = '%s' WHERE id = %d",
        Db::family_table,
        $db->escapeString($_PATCH["name"]),
        $user["family_id"]
    )
);

if (!$updateResult) {
    echo "Failed to update family.";
    http_response_code(500);
    exit();
}

// Obtain the completely updated family structure
$family = $db->getFullFamily($user["family_id"]);

if (!$family) {
    echo "Failed to find family.";
    http_response_code(500);
    exit();
}

echo json_encode($family, JSON_NUMERIC_CHECK);
