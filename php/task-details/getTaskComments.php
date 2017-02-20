<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$tasksId = $data -> tasksId;

$tasksId = mysqli_real_escape_string($conn, $tasksId);
$response = array();
if(!empty($tasksId)){
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
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>