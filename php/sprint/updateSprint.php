<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
$updateSprintSql = "";
if($sprintId == 0){
	$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Unassigned' WHERE `backlogId` = $backlogId";
}else{
	$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified', `backlogStatus` = 'Assigned to sprint' WHERE `backlogId` = $backlogId";
}
if($conn -> query($updateSprintSql)){
	include 'getSprints.php';
}else{
	$response["success"] = 0;
	$response["message"] = "sprint update failed";
	echo json_encode($response);
}
//$conn ->close();
?>