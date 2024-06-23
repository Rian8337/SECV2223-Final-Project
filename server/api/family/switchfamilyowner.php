<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/POSTOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_POST["id"])) {
    echo "Please enter a user ID.";
    http_response_code(400);
    exit();
}

// Ensure the supplied ID can be converted to an integer
if (!is_numeric($_POST["id"])) {
    echo "Invalid user ID.";
    http_response_code(400);
    exit();
}

// Convert ID to integer
$_POST["id"] = intval($_POST["id"]);

if ($_POST["id"] < 1) {
    echo "Invalid user ID.";
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
    echo "You are not part of a family.";
    http_response_code(403);
    exit();
}

$userFamilyMember = $db->query(
    sprintf(
        "SELECT role FROM %s WHERE user_id = %d",
        Db::family_member_table,
        $user["id"]
    )
)->fetch_assoc();

if (!$userFamilyMember) {
    echo "You are not part of a family.";
    http_response_code(403);
    exit();
}

if ($userFamilyMember["role"] !== "owner") {
    echo "You do not have permission to perform this action.";
    http_response_code(403);
    exit();
}

// Ensure the user to be promoted is part of the family
$userToPromote = $db->query(
    sprintf(
        "SELECT id, family_id FROM %s WHERE id = %d",
        Db::user_table,
        $_POST["id"]
    )
)->fetch_assoc();

if (!$userToPromote) {
    echo "Failed to find user.";
    http_response_code(500);
    exit();
}

if ($userToPromote["family_id"] !== $user["family_id"]) {
    echo "User is not part of your family.";
    http_response_code(403);
    exit();
}

$userToPromoteFamilyMember = $db->query(
    sprintf(
        "SELECT role FROM %s WHERE user_id = %d",
        Db::family_member_table,
        $userToPromote["id"]
    )
)->fetch_assoc();

if (!$userToPromoteFamilyMember) {
    echo "Failed to find user in family.";
    http_response_code(500);
    exit();
}

if ($userToPromoteFamilyMember["role"] === "owner") {
    echo "User is already an owner.";
    http_response_code(403);
    exit();
}

$updateUserResult = $db->query(
    sprintf(
        "UPDATE %s SET role = 'owner' WHERE user_id = %d",
        Db::family_member_table,
        $userToPromote["id"]
    )
);

if (!$updateUserResult) {
    echo "Failed to promote user.";
    http_response_code(500);
    exit();
}

$family = $db->getFullFamily($user["family_id"]);

if (!$family) {
    echo "Failed to find family.";
    http_response_code(500);
    exit();
}

echo json_encode($family, JSON_NUMERIC_CHECK);
