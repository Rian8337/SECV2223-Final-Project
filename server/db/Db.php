<?php

/**
 * Wraps a database connection for automatic closing.
 */
class Db
{
    private mysqli $db;

    public const family_table = "family";
    public const todo_table = "todo";
    public const user_table = "user";

    public function __construct()
    {
        $this->db = new mysqli("localhost", "root", "", "todo_app");

        if ($this->db->connect_error) {
            http_response_code(500);
            die("Server-side database connection failed");
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

    public function __destruct()
    {
        $this->db->close();
    }
}
