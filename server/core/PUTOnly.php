<?php

// Only allow PUT requests
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo "Invalid request method.";
    http_response_code(405);
    exit();
}

// Parse body into $_PUT associative array
parse_str(file_get_contents("php://input"), $_PUT);
