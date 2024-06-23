<?php
require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/DELETEOnly.php");
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
    echo "You are not part of a family.";
    http_response_code(403);
    exit();
}

$family = $db->query(
    sprintf(
        "SELECT id FROM %s WHERE id = %d",
        Db::family_table,
        $user["family_id"]
    )
)->fetch_assoc();

if (!$family) {
    echo "Failed to find family.";
    http_response_code(500);
    exit();
}

// Ensure the family member is an owner
$familyMember = $db->query(
    sprintf(
        "SELECT role FROM %s WHERE user_id = %d",
        Db::family_member_table,
        $user["id"]
    )
)->fetch_assoc();

if (!$familyMember) {
    echo "You are not part of a family.";
    http_response_code(403);
    exit();
}

if ($familyMember["role"] !== "owner") {
    echo "You do not have permission to delete the family.";
    http_response_code(403);
    exit();
}

// Only allow deletion if the family has no members
$familyMembers = $db->query(
    sprintf(
        "SELECT id FROM %s WHERE family_id = %d",
        Db::family_member_table,
        $user["family_id"]
    )
);

if ($familyMembers->num_rows > 1) {
    echo "Family has members. Cannot delete family.";
    http_response_code(403);
    exit();
}

$deleteResult = $db->query(
    sprintf(
        "DELETE FROM %s WHERE id = %d",
        Db::family_table,
        $user["family_id"]
    )
);

if (!$deleteResult) {
    echo "Failed to delete family.";
    http_response_code(500);
    exit();
}

http_response_code(204);
