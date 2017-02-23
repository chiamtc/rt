<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$taskId = $data -> taskId;
$backlogId = $data->backlogId;
$date_modified = $data ->date_modified;
$response = array();
	$deleteTaskCommentSql = "delete from `taskComment` where `tasksId` = $taskId";
	if($conn ->query($deleteTaskCommentSql)){
		$deleteTaskSql = "delete from `tasks` where `tasksId` = $taskId AND `backlogId` = $backlogId";if($conn -> query($deleteTaskSql)){
			$updateBacklogModifiedSql = "UPDATE `backlog` SET `date_modified`='$date_modified' where `backlogId` = $backlogId";
			
			if($conn ->query($updateBacklogModifiedSql)){
				$response["success"] = 1;
				$response["message"] = $deleteTaskSql;
				$response["date_modified"] = $date_modified;
				echo json_encode($response);
			}else{
				$response["success"] = 2;
				$response["message"] = "fail to update date modified";
				echo json_encode($response);
			}
	}else{
		$response["success"] = 0;
		$response["message"] = $deleteTaskSql;
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = $deleteTaskCommentSql;
	echo json_encode($response);
}



//$conn ->close();
?>