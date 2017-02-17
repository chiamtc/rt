<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$taskTitle = $data ->taskTitle;
$taskDesc = $data ->taskDesc;
$taskId = $data -> taskId;
$backlogId = $data->backlogId;
$date_modified = $data ->date_modified;
$taskTitle = mysqli_real_escape_string($conn, $taskTitle);
$taskDesc = mysqli_real_escape_string($conn, $taskDesc);
$response = array();
	$updateTaskSql = "UPDATE `tasks` SET `tasksTitle`='$taskTitle' , `tasksDescription` = '$taskDesc' WHERE `tasksId`  = $taskId AND `backlogId` = $backlogId";

if($conn -> query($updateTaskSql)){
	$updateBacklogModifiedSql = "UPDATE `backlog` SET `date_modified`='$date_modified' where `backlogId` = $backlogId";
		if($conn ->query($updateBacklogModifiedSql)){
			$response["date_modified"] = $date_modified;
			include 'getTasks.php';
		}else{
			$response["success"] = 2;
			$response["message"] = "fail to update date modified";
			echo json_encode($response);
		}
}else{
	$response["success"] = 0;
	$response["message"] = $updateTaskSql;
	echo json_encode($response);
}
//$conn ->close();
?>