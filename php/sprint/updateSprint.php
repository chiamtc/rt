<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;
$backlogStatus = $data -> backlogStatus;
$dateModified = $data -> dateModified;
$projectKey = $data->projectKey;
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$backlogStatus = mysqli_real_escape_string($conn, $backlogStatus);

$response = array();
$updateSprintSql = "";
if($backlogStatus == 'Regressed' || $backlogStatus =='Rejected'){
	if($backlogStatus =='Regressed'){
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Regressed' WHERE `backlogId` = $backlogId";
	}else if ($backlogStatus =='Rejected'){
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Rejected' WHERE `backlogId` = $backlogId";
	}
	
}else{
	if($sprintId == 0){
		
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Unassigned' WHERE `backlogId` = $backlogId";
	}else{
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Assigned to sprint' WHERE `backlogId` = $backlogId";
	}
}
if($conn -> query($updateSprintSql)){
	include 'getSprints.php';
}else{
	$response["success"] = 0;
	$response["message"] = $updateSprintSql;
	echo json_encode($response);
}
//$conn ->close();
?>