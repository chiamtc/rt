<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$uid = $data -> personalId;
$email = $data -> personalEmail;
$uid = mysqli_real_escape_string($conn, $uid);
$email = mysqli_real_escape_string($conn, $email);
$response= array();
if(!empty($email) && !empty($uid)){
	$getPersonalTaskSql = "SELECT * FROM `tasks` t join `backlog` b on b.backlogId = t.backlogId JOIN `upb` upb on upb.backlogId = b.backlogId join `project` p on p.projectKey = upb.projectKey WHERE `assignee` = '$email'";
	$resultPersonalTask = $conn -> query($getPersonalTaskSql);
	if($resultPersonalTask -> num_rows >0){
		$response["works"]= array();
		$task = array();
		while($rowPersonalTask= $resultPersonalTask -> fetch_assoc()){
			
			$task["taskId"] = $rowPersonalTask["tasksId"];
			$task["taskTitle"] = $rowPersonalTask["tasksTitle"];
			$task["taskDescription"] = $rowPersonalTask["tasksDescription"];
			$task["taskStatus"] = $rowPersonalTask["tasksStatus"];
			$task["date_modified"] = $rowPersonalTask["date_modified"];
			$task["projectKey"] = $rowPersonalTask["projectKey"];
			$task["projectName"] = $rowPersonalTask["projectName"];
			$task["backlogId"] = $rowPersonalTask["backlogId"];
			$task["backlogTitle"] = $rowPersonalTask["backlogTitle"];
			
			array_push($response["works"], $task);
		}
		$response["success"]=1;
		echo json_encode($response);
		
	}else{
		$response["success"] = 0;
		$response["message"]= "no assignees";
		echo json_encode($response);
	}
}

$conn ->close();
?>