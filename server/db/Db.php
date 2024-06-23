<?php

/**
 * Wraps a database connection for automatic closing.
 */
class Db
{
    private mysqli $db;

    public const family_table = "family";
    public const family_member_table = "family_member";
    public const todo_table = "todo";
    public const user_table = "user";

    public function __construct()
    {
        $this->db = new mysqli("localhost", "root", "", "todo_app");

        if ($this->db->connect_error) {
            http_response_code(500);
            echo "Server-side database connection failed";
            die();
        }
    }

    /**
     * Executes a query on the database.
     * 
     * @param string $query The query to execute.
     * @return mysqli_result|bool The result of the query. Returns `false` on failure. For successful
     * queries which produce a result set, such as `SELECT`, `SHOW`, `DESCRIBE` or `EXPLAIN`, 
     * will return a `mysqli_result` object. For other successful queries, will return `true`.
     */
    public function query(string $query): mysqli_result|bool
    {
        return $this->db->query($query);
    }

    /**
     * Escapes a string for use in a query.
     * 
     * @param string $string The string to escape.
     * @return string The escaped string.
     */
    public function escapeString(string $string): string
    {
        return $this->db->real_escape_string($string);
    }

    /**
     * Returns the database connection.
     */
    public function getDbConnection(): mysqli
    {
        return $this->db;
    }

    /**
     * Get the full family details.
     * 
     * @param int $familyId The ID of the family.
     * @return array|null The family details or `null` if the family does not exist.
     */
    public function getFullFamily(int $familyId): array|null
    {
        // Obtain family
        $family = $this->query(
            sprintf(
                "SELECT * FROM %s WHERE id = %d",
                Db::family_table,
                $familyId
            )
        )->fetch_assoc();

        if (!$family) {
            return null;
        }

        // Populate family members
        $family["members"] = $this->query(
            sprintf(
                "SELECT id, name, email FROM %s WHERE family_id = %d",
                Db::user_table,
                $familyId
            )
        )->fetch_all(MYSQLI_ASSOC);

        // Get family member roles
        $familyMemberRoles = $this->query(
            sprintf(
                "SELECT user_id, role FROM %s WHERE family_id = %d",
                Db::family_member_table,
                $familyId
            )
        )->fetch_all(MYSQLI_ASSOC);

        // Assign roles to family members
        foreach ($family["members"] as &$member) {
            foreach ($familyMemberRoles as $role) {
                if ($role["user_id"] === $member["id"]) {
                    $member["role"] = $role["role"];
                    break;
                }
            }
        }

        return $family;
    }

    public function __destruct()
    {
        $this->db->close();
    }
}
