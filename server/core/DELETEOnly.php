<?php

// Only allow DELETE requests
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo "Invalid request method.";
    http_response_code(405);
    exit();
}

// Parse body into $_DELETE associative array
parse_str(file_get_contents("php://input"), $_DELETE);
