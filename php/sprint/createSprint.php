<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintGoal = $data -> sprintGoal;
$sprintStartDate = $data -> sprintStartDate;
$sprintEndDate = $data -> sprintEndDate;
$projectKey = $data -> projectKey; 
$sprintGoal = mysqli_real_escape_string($conn, $sprintGoal);
$sprintStartDate = mysqli_real_escape_string($conn, $sprintStartDate);
$sprintEndDate = mysqli_real_escape_string($conn, $sprintEndDate);
$projectKey = mysqli_real_escape_string($conn, $projectKey);
$sprintStatus = 'Created';
$response = array();
if(!empty($sprintStartDate) && !empty($sprintEndDate) && !empty($projectKey)){
	$createSprintSql = "Insert into `sprint`(`sprintId`, `sprintStatus`,`sprintGoal`, `sprintStartDate`, `sprintEndDate`, `projectKey`) VALUES('', '$sprintStatus','$sprintGoal', '$sprintStartDate', '$sprintEndDate', '$projectKey')";
	if($conn -> query($createSprintSql)){
			
		$response["sprints"] = array();
		$sprint = array();
			
		$sprint["sprintId"] = $conn->insert_id;
		$sprint["sprintStatus"]= $sprintStatus;
		$sprint["sprintGoal"] = $sprintGoal;
		$sprint["sprintStartDate"] = $sprintStartDate;
		$sprint["sprintEndDate"] = $sprintEndDate;
		
		$sprint["backlogs"] = array();
		$backlog = array();
			
		$backlog["backlogTitle"] = "Drag a backlog here :) !";
		$backlog["backlogPriority"] = "Unknown";
		$backlog["backlogStoryPoint"] = "-";
		$backlog["backlogType"] = "Not even created";
		$backlog["drag"] = false;
		array_push($sprint["backlogs"], $backlog);
			
		array_push($response["sprints"], $sprint);
			
		$response["success"] = 1;
		$response["message"] = "sprint_created";
		echo json_encode($response);
		
	}else{
		$response["success"] = 0;
		$response["message"] = "server error 1";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>