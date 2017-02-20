<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$commentIn = $data -> comment;
$email = $data ->email;
$tasksId = $data -> tasksId;
$date_comment = $data -> dateComment;
$commentIn = mysqli_real_escape_string($conn, $commentIn);
$email = mysqli_real_escape_string($conn, $email);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
if(!empty($commentIn) && !empty($email)){
	$submitCommentSql = "Insert into `taskComment`(`taskCommentId`, `taskComment`, `date_comment`, `email`, `tasksId`) VALUES('', '$commentIn', '$date_comment', '$email', $tasksId)";
	if($conn -> query($submitCommentSql)){
		
		$response["taskComment"] = array();
		$taskComment = array();
		$taskComment["taskComment"] = $commentIn;
		$taskComment["taskCommentId"] = $conn ->insert_id;
		$taskComment["dateComment"] = $date_comment;
		$taskComment["email"] = $email;
		array_push($response["taskComment"], $taskComment);
		$response["success"] = 1;
		echo json_encode($response);
		
	}else{
		$response["success"] = 0;
		$response["message"] = "failed to comment";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>