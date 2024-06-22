<?php

if (!isset($_COOKIE["sessionId"]) || strlen($_COOKIE["sessionId"]) !== 64) {
    echo "Invalid session. Please log in again.";
    http_response_code(401);
    exit();
}
