<?php

require_once("../../core/Env.php");
require_once('../../db/Db.php');
require_once("../../core/DELETEOnly.php");
require_once("../../core/CheckCookie.php");

if (!isset($_DELETE["id"])) {
    echo "Please enter a user ID.";
    http_response_code(400);
    exit();
}

// Ensure the supplied ID can be converted to an integer
if (!is_numeric($_DELETE["id"])) {
    echo "Invalid user ID.";
    http_response_code(400);
    exit();
}

// Convert ID to integer
$_DELETE["id"] = intval($_DELETE["id"]);

if ($_DELETE["id"] < 1) {
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

$userToRemove = $db->query(
    sprintf(
        "SELECT id, family_id FROM %s WHERE id = %d",
        Db::user_table,
        $_DELETE["id"]
    )
)->fetch_assoc();

if (!$userToRemove) {
    echo "Failed to find user.";
    http_response_code(500);
    exit();
}

// Check if the user to be removed is a part of the family
if ($userToRemove["family_id"] !== $user["family_id"]) {
    echo "User is not part of your family.";
    http_response_code(403);
    exit();
}

$userToRemoveFamilyMember = $db->query(
    sprintf(
        "SELECT role FROM %s WHERE user_id = %d",
        Db::family_member_table,
        $userToRemove["id"]
    )
)->fetch_assoc();

if (!$userToRemoveFamilyMember) {
    echo "Failed to find user in family.";
    http_response_code(500);
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
    echo "Failed to find your status in family.";
    http_response_code(500);
    exit();
}

// When not removing self, check if the user has enough permission to remove the family member
// For example, we would not want an admin to be able to remove another admin or family owner
if ($user["id"] !== $userToRemove["id"] && $userFamilyMember["role"] === "admin" && $userToRemoveFamilyMember["role"] !== "member") {
    echo "You have no permission to perform this action.";
    http_response_code(403);
    exit();
}

$removeMemberUpdateResult = $db->query(
    sprintf(
        "UPDATE %s SET family_id = NULL WHERE id = %d",
        Db::user_table,
        $userToRemove["id"]
    )
);

if (!$removeMemberUpdateResult) {
    echo "Failed to remove user from family.";
    http_response_code(500);
    exit();
}

$family = $db->getFullFamily($user["family_id"]);

// If the user is removing themselves and they are the owner, select a random admin and promote them to owner
// If no admins are present, select a random member and promote them to owner
// If there are no members, delete the family
if ($user["id"] === $userToRemove["id"] && $userFamilyMember["role"] === "owner") {
    $admins = [];
    $members = [];

    foreach ($familyMembers as $member) {
        if ($member["role"] === "admin") {
            $admins[] = $member["id"];
        } else {
            $members[] = $member["id"];
        }
    }

    if (count($admins) > 0) {
        $newOwner = $admins[array_rand($admins)];
    } else if (count($members) > 0) {
        $newOwner = $members[array_rand($members)];
    } else {
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
        exit();
    }

    $updateOwnerResult = $db->query(
        sprintf(
            "UPDATE %s SET role = 'owner' WHERE user_id = %d",
            Db::family_member_table,
            $newOwner
        )
    );

    if (!$updateOwnerResult) {
        echo "Failed to update owner.";
        http_response_code(500);
        exit();
    }

    // Update the promoted user's role in the family members array
    foreach ($family["members"] as &$member) {
        if ($member["id"] === $newOwner) {
            $member["role"] = "owner";
            break;
        }
    }
}

echo json_encode($family, JSON_NUMERIC_CHECK);
