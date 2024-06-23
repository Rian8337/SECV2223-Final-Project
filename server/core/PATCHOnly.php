<?php

// Only allow PATCH requests
if ($_SERVER['REQUEST_METHOD'] !== 'PATCH') {
    echo "Invalid request method.";
    http_response_code(405);
    exit();
}

// Parse body into $_PATCH associative array
parse_str(file_get_contents("php://input"), $_PATCH);
