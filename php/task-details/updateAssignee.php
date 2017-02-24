<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$assignee = $data ->assignee;
$backlogId = $data ->backlogId;
$taskId = $data -> tasksId;
$dateModified = $data -> dateModified;
$assignee = mysqli_real_escape_string($conn, $assignee);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateAssigneeSql = "UPDATE `tasks` SET `assignee`='$assignee', `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId AND `tasksId` = $taskId";
if($conn -> query($updateAssigneeSql)){
	$response["success"] = 1;
	$response["message"] = "task assignee updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "task assignee update failed";
	echo json_encode($response);
}
$conn ->close();
?>