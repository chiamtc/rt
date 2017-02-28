<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;
$projectKey = $data->projectKey;
$reviewComment = $data ->reviewComment;
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();

if(!empty($projectKey)){
	$acceptBacklogSql = "UPDATE `backlog` SET `backlogStatus` = 'Accepted' WHERE `backlogId` = $backlogId AND `sprintId` = $sprintId";
	if($conn -> query($acceptBacklogSql)){
		if(!empty($reviewComment)){
			$insertReviewsql ="INSERT INTO `review`(`reviewId`, `review`, `sprintId`, `backlogId`) VALUES ('','$reviewComment',$sprintId,$backlogId)"; 
			$resultInsertReview = $conn ->query($insertReviewsql);
		}
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
		$response["message"] = "accepted 1 failed";
		echo json_encode($response);
	}
}else{
	$response["success"] = 4;	
	$response["message"] = "project key is empty";
	echo json_encode($response);
}
$conn ->close();
?>