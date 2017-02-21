<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$sprintId = $data ->sprintId;
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$response = array();
if(!empty($projectKey) && !empty($sprintId)){
	
	$deleteBacklogFromSprintSql = "Update `backlog` SET `sprintId` = 0 , `backlogStatus` = 'Unassigned' where `sprintId` = $sprintId";
	
	if($conn ->query($deleteBacklogFromSprintSql)){
		$deleteSprintSql = "delete from `sprint` where `sprintId` = $sprintId AND `projectKey` = '$projectKey'";
		if($conn ->query($deleteSprintSql)){
			$response["success"] = 1;
			$response["message"] = "sprint_deleted";
			echo json_encode($response);
		}else{
			$response["success"] = 0;
			$response["message"] = "failed to delete sprint";
			echo json_encode($response);
		}
	}else{
		$response["success"] = 2;
		$response["message"] = "failed to update backlogs in the sprint";
		echo json_encode($response);
	}
	
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}
$conn ->close();
?>
