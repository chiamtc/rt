<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;
$projectKey = $data->projectKey;
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();

if(!empty($projectKey)){
	$rejectBacklogSql = "UPDATE `backlog` SET `backlogStatus` = 'Rejected' , `sprintId` = 0 WHERE `backlogId` = $backlogId AND `sprintId` = $sprintId";
	if($conn -> query($rejectBacklogSql)){
		$numberOfBacklogSql = "select count(*) as rows from `backlog` where `sprintID` = $sprintId AND (`backlogStatus` = 'Done')";
		$resultCountBacklog = $conn ->query($numberOfBacklogSql);
		$rowCounts = $resultCountBacklog -> fetch_assoc();
		$numberRows = $rowCounts["rows"];
		if($numberRows == 0){
			$updateSprintSql = "UPDATE `sprint` SET `sprintStatus` = 'Reviewed' WHERE `sprintId` = $sprintId AND `projectKey` = '$projectKey'";
			if($conn ->query($updateSprintSql)){
				$response["success"] = 2;
				$response["message"] = "sprint has been reviewed";
				echo json_encode($response);
			}else{
				$response["success"] = 3;
				$response["message"] = "sprint failed to review";
				echo json_encode($response);
			}
		}else{
			$response["success"] = 1;
			$response["message"] = "accpted";
			echo json_encode($response);
		}
	}else{
		$response["success"] = 0;
		$response["message"] = "rejected 1 failed";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "project key is empty";
	echo json_encode($response);
}
$conn ->close();
?>