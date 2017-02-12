<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;

$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId WHERE `backlogId` = $backlogId";
if($conn -> query($updateSprintSql)){
	$response["success"] = 1;
	$response["message"] = "updated sprint!";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "sprint update failed";
	echo json_encode($response);
}
$conn ->close();
?>