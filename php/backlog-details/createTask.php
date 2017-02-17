<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$taskTitle = $data ->taskTitle;
$taskDesc = $data ->taskDesc;
$backlogId = $data -> backlogId;
$date_modified = $data ->date_modified;
$taskTitle = mysqli_real_escape_string($conn, $taskTitle);
$taskDesc = mysqli_real_escape_string($conn, $taskDesc);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
if(!empty($taskTitle) && !empty($backlogId)){
	$createTaskSql = "Insert into `tasks`(`tasksId`, `tasksTitle`, `tasksDescription`, `tasksStatus`, `backlogId`) VALUES('', '$taskTitle', '$taskDesc', 'To-do', $backlogId)";
	if($conn -> query($createTaskSql)){
		$updateBacklogModifiedSql = "UPDATE `backlog` SET `date_modified`='$date_modified' where `backlogId` = $backlogId";
		if($conn ->query($updateBacklogModifiedSql)){
			$taskId = $conn -> insert_id;
			$response["task"] = array();
			$task = array();
			$task["tasksId"] = $taskId;
			$task["tasksTitle"] = $taskTitle;
			$task["tasksDesc"] = $taskDesc;
			$task["tasksStatus"] = 'To-do';
			array_push($response["task"], $task);
			$response["success"] = 1;
			$response["date_modified"] = $date_modified;
			echo json_encode($response);
		}else{
			$response["success"] = 2;
			$response["message"] = "fail to update date modified";
			echo json_encode($response);
		}
	}else{
		$response["success"] = 0;
		$response["message"] = "fail to create task";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>