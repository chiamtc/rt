<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogId = $data ->backlogId;
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();

if(!empty($backlogId)){
	$getReviewSql = "Select * from `review` where `backlogId` = $backlogId";
	$resultGetReview = $conn ->query($getReviewSql);
	$response["reviews"] = array();
	$review = array();
	if($resultGetReview -> num_rows >0){
		
		while($rowGetReview = $resultGetReview ->  fetch_assoc()){
			$review["review"] = $rowGetReview['review'];
			array_push($response["reviews"], $review);
		}
		$response["success"] = 1;
		echo json_encode($response);
	}else{
		$review["review"] = "No review(s) from previous sprint review";
		array_push($response["reviews"], $review);
		$response["success"] = 0;
		echo json_encode($response);
	}
}else{
	$response["success"] = 2;	
	$response["message"] = "backlogId is empty";
	echo json_encode($response);
}
$conn ->close();
?>