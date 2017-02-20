<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogId = $data -> backlogId;

$backlogId = mysqli_real_escape_string($conn, $backlogId);

$response = array();
if(!empty($backlogId)){
	$getTasksSql	= "select * from `tasks` where `backlogId` = $backlogId order by `tasksId`";
	$resultGetTasks = $conn -> query($getTasksSql);
	if($resultGetTasks -> num_rows >0){
		$response["tasks"] = array();
		while($rowGetTasks = $resultGetTasks -> fetch_assoc()){
			$task = array();
			$task["tasksId"] = $rowGetTasks["tasksId"];
			$task["tasksTitle"] = $rowGetTasks["tasksTitle"];
			$task["tasksDesc"] = $rowGetTasks["tasksDescription"];
			$task["tasksStatus"] = $rowGetTasks["tasksStatus"];
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
	$response["success"] = 3;
	$response["message"] = "empty fields backlo-gid?";
	echo json_encode($response);
}

$conn ->close();
?>