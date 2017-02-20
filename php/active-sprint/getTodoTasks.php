<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
$response["found"] = false;
if(!empty($projectKey)){
	//$getSprintSql = "SELECT * FROM `sprint` s left join `backlog` b on s.sprintId = b.sprintId where s.projectKey = '$projectKey'";
	$getTodoTasks = "SELECT t.`tasksTitle` , t.`tasksStatus`
					FROM `tasks` t 
					inner join `backlog` b
					on b.`backlogId` = t.`backlogId`
					inner join `sprint` s
					on s.`sprintId` = b.`sprintId` 
					where s.`sprintStatus` = 'Active' AND s.`projectKey` = '$projectKey' AND  t.`tasksStatus` = 'To-do'";
	
	$resultTodoTasks = $conn ->query($getTodoTasks);
	if($resultTodoTasks -> num_rows >0){
		$response["todos"] = array();
		
		while($rowTodo = $resultTodoTasks -> fetch_assoc()){
			$todo = array();
			$todo["tasksTitle"] = $rowTodo["tasksTitle"];
			$todo["tasksStatus"] = $rowTodo["tasksStatus"];
			array_push($response["todos"], $todo);
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