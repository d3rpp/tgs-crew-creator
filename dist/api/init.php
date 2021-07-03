<?php

include ".constants.php";

$connection = null;

try {
	$connection = new PDO("mysql:host=$serverName;dbname=HUDSON_CURREN_INTERNAL_DB_2021", $username, $password);
	// echo ''
} catch (PDOException $e) {
	echo '{"error": "' . $e->getMessage() . '"}';
	exit(1);
}
