<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$taskTitle = $data ->taskTitle;
$taskDesc = $data ->taskDesc;
$assignee = $data -> assignee;
$backlogId = $data -> backlogId;
$date_modified = $data ->date_modified;
$date_created = $data -> date_created;
$taskTitle = mysqli_real_escape_string($conn, $taskTitle);
$taskDesc = mysqli_real_escape_string($conn, $taskDesc);
$assignee = mysqli_real_escape_string($conn, $assignee);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
if(!empty($taskTitle) && !empty($backlogId)){
	$createTaskSql = "Insert into `tasks`(`tasksId`, `tasksTitle`, `tasksDescription`, `tasksStatus`,`date_created`, `date_modified`, `assignee`,`backlogId`) VALUES('', '$taskTitle', '$taskDesc', 'To-do', '$date_created', '$date_modified', '$assignee',$backlogId)";
	if($conn -> query($createTaskSql)){
		$taskId = $conn ->insert_id;
		$updateBacklogModifiedSql = "UPDATE `backlog` SET `date_modified`='$date_modified' where `backlogId` = $backlogId";
		if($conn ->query($updateBacklogModifiedSql)){
			
			$getTasksSql = "select * from `tasks` where `backlogId` = $backlogId order by `tasksId`";
			$resultGetTasks = $conn -> query($getTasksSql);
			if($resultGetTasks -> num_rows >0){
				$response["tasks"] = array();
				while($rowGetTasks = $resultGetTasks -> fetch_assoc()){
					$task = array();
					$task["tasksId"] = $rowGetTasks["tasksId"];
					$task["tasksTitle"] = $rowGetTasks["tasksTitle"];
					$task["tasksDesc"] = $rowGetTasks["tasksDescription"];
					$task["tasksStatus"] = $rowGetTasks["tasksStatus"];
					$task["assignee"] = $rowGetTasks["assignee"];
					array_push($response["tasks"], $task);
				}
				$response["success"] = 1;
				echo json_encode($response);
				
			}else{
				$response["success"] = 0;
				$response["message"] = "cant find tasks";
				echo json_encode($response);
			}
		}else{
			$response["success"] = 2;
			$response["message"] = "fail to update date modified";
			echo json_encode($response);
		}
	}else{
		$response["success"] = 0;
		$response["message"] = "server error";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>