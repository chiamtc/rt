<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$taskId = $data -> taskId;

$response = array();
if(!empty($taskId)){
	//$getSprintSql = "SELECT * FROM `sprint` s left join `backlog` b on s.sprintId = b.sprintId where s.projectKey = '$projectKey'";
	$findTaskSql = "select * from `tasks` where tasksId = $taskId";
	
	$resultFindTask = $conn ->query($findTaskSql);
	if($resultFindTask -> num_rows >0){
		$response["tasks"] = array();
		
		while($rowTask = $resultFindTask -> fetch_assoc()){
			$task = array();
			$task["tasksId"] = $taskId;
			$task["tasksTitle"] = $rowTask["tasksTitle"];
			$task["tasksStatus"] = $rowTask["tasksStatus"];
			$task["tasksDesc"] = $rowTask["tasksDescription"];
			$task["assignee"] = $rowTask["assignee"];
			$task["dateCreated"] = $rowTask["date_created"];
			$task["dateModified"] = $rowTask["date_modified"];
			$task["backlogId"] = $rowTask["backlogId"];
			array_push($response["tasks"], $task);
		}
		$response["success"] = 1;
		echo json_encode($response);
	}
}else{
	$response["success"] = 2;
	$response["message"] = "empty project key";
	echo json_encode($response);
}
$conn ->close();
?>