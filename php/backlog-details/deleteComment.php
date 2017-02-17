<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$backlogId = $data ->backlogId;
$backlogCommentId = $data -> commentId;
$projectKey = mysqli_real_escape_string($conn, $backlogId);
$sprintId = mysqli_real_escape_string($conn, $backlogCommentId);

$response = array();

$deleteBacklogCommentSql = "delete from `backlogComment` where `backlogId` = $backlogId AND `backlogCommentId` = $backlogCommentId";
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