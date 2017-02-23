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
		
		$getCommentSql	= "select * from `taskComment` where `tasksId` = $tasksId order by `date_comment` asc";
		$resultGetComment = $conn -> query($getCommentSql);
		if($resultGetComment -> num_rows >0){
			$response["taskComments"] = array();
			while($rowGetComments = $resultGetComment -> fetch_assoc()){
				$taskComment = array();
				$taskComment["taskCommentId"] = $rowGetComments["taskCommentId"];
				$taskComment["taskComment"] = $rowGetComments["taskComment"];
				$taskComment["dateComment"] = $rowGetComments["date_comment"];
				$taskComment["email"] = $rowGetComments["email"];
				$taskComment["tasksId"] = $rowGetComments["tasksId"];
				array_push($response["taskComments"], $taskComment);
			}
			$response["success"] = 1;
			echo json_encode($response);
			
		}else{
			$response["success"] = 0;
			$response["message"] = "cant find comment";
			echo json_encode($response);
		}
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