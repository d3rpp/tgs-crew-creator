<?php

// Gain Access to DB
include "../.init.php";

// makes my code editor happy, and php i guess
// because $db can be `null` or `PDOConnection`
if ($db != null) {

	// the error mode for PDO is set to be Exceptions, meaning if the query fails, there will be an exception thrown
	// the point of the try/catch statement is to catch it and return the error in JSON form
	try {

		// Query to Run
		// putting a space after the column name will rename it in the result
		// meaning `age_group` will become `ageGroup`
		$query = $db->prepare("SELECT id, name, age_group ageGroup, gender FROM crew_members");

		// Execute Query
		$query->execute();

		// Set Fetch Mode to assoc
		// used here 'https://www.w3schools.com/php/php_mysql_select.asp'
		$query->setFetchMode(PDO::FETCH_ASSOC);

		// Get everything as a list
		$result = $query->fetchAll();

		// Return JSON Encoded list
		// thank the universe for `json_encode()`
		// and screw this damn scripting language
		echo json_encode($result);

		// catch the PDO Exception
	} catch (PDOException $e) {

		// tells the browser there was a problem
		header('HTTP/1.1 500 Internal Server Error', true, 500);

		// puts the error in JSON form
		echo '{"error": "' . $e->getMessage() . '"}';

		// gotta close the connection before you quit
		$connection = null;

		// exists the script before anything stupid happens
		exit(0);
	}
} else {

	// like above
	header('HTTP/1.1 500 Internal Server Error', true, 500);

	// we don't have an error message here so we dont worry about this
	echo '{"error": "Database Connection is null"}';

	// exits the script because the connection is already null
	exit(0);
}





// ADD AT END OF EVERY SCRIPT
// CLOSES DB CONNECTION BECAUSE PHP HAS WEIRD GARBAGE COLLECTION
$connection = null;
