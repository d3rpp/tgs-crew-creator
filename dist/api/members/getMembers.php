<?php

include ".init.php";

if ($db != null) {

	try {
		$query = $db->prepare("SELECT * FROM crew_members");
		$query->execute();

		$query->setFetchMode(PDO::FETCH_ASSOC);

		$result = $query->fetchAll();
		echo json_encode($result);
	} catch (PDOException $e) {
		header('HTTP/1.1 500 Internal Server Error', true, 500);
		echo '{"error": "' . $e->getMessage() . '"}';
		exit(1);
	}
}





// ADD AT END OF EVERY SCRIPT
$connection = null;
