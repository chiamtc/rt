<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$tasksDesc = $data ->taskDesc;
$backlogId = $data ->backlogId;
$taskId = $data -> taskId;
$dateModified = $data -> dateModified;
$tasksDesc = mysqli_real_escape_string($conn, $tasksDesc);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateDescSql = "UPDATE `tasks` SET `tasksDescription`='$tasksDesc', `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId AND `tasksId` = $taskId";
if($conn -> query($updateDescSql)){
	$response["success"] = 1;
	$response["message"] = "task desc updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "task desc update failed";
	echo json_encode($response);
}
$conn ->close();
?>