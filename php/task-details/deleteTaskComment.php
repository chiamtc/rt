<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$tasksId = $data ->tasksId;
$commentId = $data -> commentId;
$tasksId = mysqli_real_escape_string($conn, $tasksId);
$commentId = mysqli_real_escape_string($conn, $commentId);

$response = array();

$deleteBacklogCommentSql = "delete from `taskComment` where `tasksId` = $tasksId AND `taskCommentId` = $commentId";
	if($conn ->query($deleteBacklogCommentSql)){
		$response["success"] = 1;
		$response["message"] = "comment deleted";
		echo json_encode($response);
	}else{
		$response["success"] = 0;
		$response["message"] = $deleteBacklogCommentSql;
		echo json_encode($response);
	}
	
$conn ->close();
?>