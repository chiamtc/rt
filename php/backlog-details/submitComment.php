<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$commentIn = $data -> comment;
$email = $data ->email;
$backlogId = $data -> backlogId;
$date_comment = $data -> dateComment;
$commentIn = mysqli_real_escape_string($conn,$commentIn);
$email = mysqli_real_escape_string($conn, $email);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
if(!empty($commentIn) && !empty($email)){
	$submitCommentSql = "Insert into `backlogComment`(`backlogCommentId`, `backlogComment`, `date_comment`, `email`, `backlogId`) VALUES('', '$commentIn', '$date_comment', '$email', $backlogId)";
	if($conn -> query($submitCommentSql)){
		$getCommentSql	= "select * from `backlogComment` where `backlogId` = $backlogId order by `date_comment` asc";
		$resultGetComment = $conn -> query($getCommentSql);
		if($resultGetComment -> num_rows >0){
			$response["comments"] = array();
			while($rowGetComments = $resultGetComment -> fetch_assoc()){
				$comment = array();
				$comment["commentId"] = $rowGetComments["backlogCommentId"];
				$comment["comment"] = $rowGetComments["backlogComment"];
				$comment["dateComment"] = $rowGetComments["date_comment"];
				$comment["email"] = $rowGetComments["email"];
				$comment["backlogId"] = $rowGetComments["backlogId"];
				array_push($response["comments"], $comment);
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