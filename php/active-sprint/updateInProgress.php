<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$tasksId = $data ->tasksId;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;

$tasksId = mysqli_real_escape_string($conn, $tasksId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();

$updateTodoSql = "UPDATE `tasks` SET `tasksStatus`='In-Progress', `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId AND `tasksId` = $tasksId";

if($conn -> query($updateTodoSql)){
	$updateBacklogDateModifiedSql = "Update `backlog` SET `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId";
	if($conn ->query($updateBacklogDateModifiedSql)){
		$response["success"] = 1;
		$response["dateModified"] = $dateModified;
		$response["message"] = "todo updated";
		echo json_encode($response);
	}else{
		$response["success"] = 2;
		$response["message"] = "date modifed failed";
		echo json_encode($response);
	}
}else{
	$response["success"] = 0;
	$response["message"] = "todo failed";
	echo json_encode($response);
}
//$conn ->close();
?>