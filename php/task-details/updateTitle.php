<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$tasksTitle = $data ->tasksTitle;
$backlogId = $data ->backlogId;
$taskId = $data -> taskId;
$dateModified = $data -> dateModified;
$tasksTitle = mysqli_real_escape_string($conn, $tasksTitle);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateTitleSql = "UPDATE `tasks` SET `tasksTitle`='$tasksTitle', `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId AND `tasksId` = $taskId";
if($conn -> query($updateTitleSql)){
	$response["success"] = 1;
	$response["message"] = "task title updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "task title update failed";
	echo json_encode($response);
}
$conn ->close();
?>