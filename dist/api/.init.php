<?php

include ".constants.php";

$db = null;

header("Content-Type: application/json; charset=UTF-8");

try {
	$db = new PDO("mysql:host=$serverName;dbname=HUDSON_CURREN_INTERNAL_DB_2021", $username, $password);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// echo ''
} catch (PDOException $e) {
	header('HTTP/1.1 500 Internal Server Error', true, 500);
	echo '{"error": "' . $e->getMessage() . '"}';
	exit(0);
}
