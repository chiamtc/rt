<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data -> sprintId;
$sprintGoal = $data -> sprintGoal;
$sprintStartDate = $data -> sprintStartDate;
$sprintEndDate = $data -> sprintEndDate;
$projectKey = $data -> projectKey;

$sprintGoal = mysqli_real_escape_string($conn, $sprintGoal);
$sprintStartDate = mysqli_real_escape_string($conn, $sprintStartDate);
$sprintEndDate = mysqli_real_escape_string($conn, $sprintEndDate);
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
if(!empty($sprintStartDate) && !empty($sprintEndDate) && !empty($projectKey)){
	$editSprintSql = "Update `sprint` SET `sprintGoal` = '$sprintGoal', `sprintStartDate` = '$sprintStartDate' , `sprintEndDate` = '$sprintEndDate' where `projectKey` = '$projectKey' AND `sprintId` = $sprintId";
	if($conn -> query($editSprintSql)){
		
		$response["success"] = 1;
		$response["message"] = "sprint details updated";
		echo json_encode($response);
		
	}else{
		$response["success"] = 0;
		$response["message"] = $editSprintSql;
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();

?>