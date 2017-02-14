<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$commentIn = $data -> comment;
$email = $data ->email;
$backlogId = $data -> backlogId;

$commentIn = mysqli_real_escape_string($conn, $commentIn);
$email = mysqli_real_escape_string($conn, $email);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
date_default_timezone_set("Australia/Brisbane");
$date_comment = date("Y/m/d");
$time_comment = date("h:i:sa");
$response = array();
if(!empty($commentIn) && !empty($email)){
	$submitCommentSql = "Insert into `comment`(`commentId`, `comment`, `date_comment`, `time_comment`, `email`, `backlogId`) VALUES('', '$commentIn', '$date_comment', '$time_comment', '$email', $backlogId)";
	if($conn -> query($submitCommentSql)){
		$response["comment"] = array();
		$comment = array();
		$comment["comment"] = $commentIn;
		$comment["date_comment"] = $date_comment;
		$comment["time_comment"] = $time_comment;
		$comment["email"] = $email;		
		array_push($response["comment"], $comment);
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