<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;
$backlogStatus = $data ->backlogStatus;
$projectKey = $data->projectKey;
$dateModified = $data -> dateModified;
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
$updateSprintSql = "";

if($backlogStatus != 'Regressed'){
	if($sprintId == 0){
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Unassigned' WHERE `backlogId` = $backlogId";
	}else{
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified', `backlogStatus` = 'Assigned to active sprint' WHERE `backlogId` = $backlogId";
	}
}else{
	$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Regressed' WHERE `backlogId` = $backlogId";
}
if($conn -> query($updateSprintSql)){
	include 'getActiveSprint.php';
}else{
	$response["success"] = 0;
	$response["message"] = "sprint update failed";
	echo json_encode($response);
}
//$conn ->close();
?>