<?php

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo "Invalid request method.";
    http_response_code(405);
    exit();
}
