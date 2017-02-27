<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data -> sprintId;
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
if(!empty($projectKey)){
	$editSprintSql = "Update `sprint` SET `sprintStatus` = 'Active' where `projectKey` = '$projectKey' AND `sprintId` = $sprintId";
	if($conn -> query($editSprintSql)){
		
		$updateBacklogStatusSql = "update `backlog` SET `backlogStatus` = 'Assgined to active sprint' where `sprintId` = $sprintId AND `backlogStatus` != 'Regressed' AND `backlogStatus` != 'Rejected'";
		if($conn ->query($updateBacklogStatusSql)){
			$response["success"] = 1;
			$response["message"] = "sprint started";
			echo json_encode($response);
		}else{
			$response["success"] = 2;
			$response["message"] = 'Backlog status not updated';
			echo json_encode($response);
		}
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