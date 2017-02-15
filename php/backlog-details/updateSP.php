<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogSP = $data ->backlogSP;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogSP = mysqli_real_escape_string($conn, $backlogSP);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateSPSql = "UPDATE `backlog` SET `backlogStoryPoint`='$backlogSP' WHERE `backlogId` = $backlogId";
if($conn -> query($updateSPSql)){
	$response["success"] = 1;
	$response["message"] = "backlog SP updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "backlog SP update failed";
	echo json_encode($response);
}
$conn ->close();
?>