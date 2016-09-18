<?php
require __DIR__.'/db_connection.php';

$sql = "DROP DATABASE ".DB_DB."";
if (mysqli_query($conn, $sql)) {
	echo "Database " . $databasetodrop . " dropped successfully. <br>";
} else {
	echo "Error dropping database: " . mysqli_error($conn). "<br>";
}

mysqli_close($conn);
?>