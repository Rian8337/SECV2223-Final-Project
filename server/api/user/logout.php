<?php

require_once("../../core/Env.php");
require_once("../../core/POSTOnly.php");
require_once("../../core/CheckCookie.php");

unset($_COOKIE["sessionId"]);
setcookie("sessionId", "", -1);
