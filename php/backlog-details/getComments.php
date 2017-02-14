<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogId = $data -> backlogId;

$backlogId = mysqli_real_escape_string($conn, $backlogId);
date_default_timezone_set("Australia/Brisbane");
$date_comment = date("Y/m/d");
$time_comment = date("h:i:sa");
$response = array();
if(!empty($backlogId)){
	$getCommentSql	= "select * from `comment` where `backlogId` = $backlogId";
	$resultGetComment = $conn -> query($getCommentSql);
	if($resultGetComment -> num_rows >0){
		$response["comments"] = array();
		while($rowGetComments = $resultGetComment -> fetch_assoc()){
			$comment = array();
			$comment["comment"] = $rowGetComments["comment"];
			$comment["date_comment"] = $rowGetComments["date_comment"];
			$comment["time_comment"] =$rowGetComments["time_comment"];
			$comment["email"] = $rowGetComments["email"];
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
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>