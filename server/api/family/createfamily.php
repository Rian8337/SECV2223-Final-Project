<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/PUTOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_PUT["name"])) {
    echo "Please enter a family name.";
    http_response_code(400);
    exit();
}

if (strlen($_PUT["name"]) < 3) {
    echo "Family name must be at least 3 characters long.";
    http_response_code(400);
    exit();
}

if (strlen($_PUT["name"]) > 255) {
    echo "Family name must be at most 255 characters long.";
    http_response_code(400);
    exit();
}

$db = new Db();

$user = $db->query(
    sprintf(
        "SELECT id, name, email, family_id FROM %s WHERE session_id = '%s'",
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

if (isset($user["family_id"])) {
    echo "You are already part of a family.";
    http_response_code(403);
    exit();
}

$familyInsertResult = $db->query(
    sprintf(
        "INSERT INTO %s (name) VALUES ('%s')",
        Db::family_table,
        $db->escapeString($_PUT["name"])
    )
);

if (!$familyInsertResult) {
    echo "Failed to create family.";
    http_response_code(500);
    exit();
}

$familyId = $db->getDbConnection()->insert_id;

$familyMemberResult = $db->query(
    sprintf(
        "INSERT INTO %s (family_id, user_id, role) VALUES (%d, %d, 'owner')",
        Db::family_member_table,
        $familyId,
        $user["id"],
    )
);

if (!$familyMemberResult) {
    echo "Failed to add user to family.";
    http_response_code(500);
    exit();
}

$updateResult = $db->query(
    sprintf(
        "UPDATE %s SET family_id = %d WHERE id = %d",
        Db::user_table,
        $familyId,
        $user["id"]
    )
);

if (!$updateResult) {
    echo "Failed to add user to family.";
    http_response_code(500);
    exit();
}

$family = $db->getFullFamily($familyId);

if (!$family) {
    echo "Failed to find family.";
    http_response_code(500);
    exit();
}

http_response_code(201);
echo json_encode($family, JSON_NUMERIC_CHECK);
