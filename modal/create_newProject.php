<?php
require "db_connection.php";

$projectName = mysqli_real_escape_string($conn, $_POST['projectName']);
$projectDescription = mysqli_real_escape_string($conn, $_POST['projectDesc']);
date_default_timezone_set("Australia/Brisbane");
$date_created = date("Y/m/d");

$response= array();
if(isset($projectName) && isset($projectDescription)){
	$sqlCreateProject = "INSERT INTO `project`(`projectID`, `projectName`, `projectDescription`, `date_created`)
							VALUES('', '$projectName', '$projectDescription', '$date_created')";
	if($conn -> query($sqlCreateProject)){
		$response["success"] = 1;
		$response["message"]= "project created";
		echo json_encode($response);
		
	}else{
		$response["success"]= 0;
		$response["message"] = "failed to create";
		echo json_encode($response);
	}
}else{
	$response["success"] =0;
	$response["message"] = "inputs are empty";
	echo json_encode($response);
}
$conn ->close();
?>