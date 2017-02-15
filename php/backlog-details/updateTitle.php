<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogTitle = $data ->backlogTitle;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogTitle = mysqli_real_escape_string($conn, $backlogTitle);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateTitleSql = "UPDATE `backlog` SET `backlogTitle`='$backlogTitle' WHERE `backlogId` = $backlogId";
if($conn -> query($updateTitleSql)){
	$response["success"] = 1;
	$response["message"] = "backlog title updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "backlog title update failed";
	echo json_encode($response);
}
$conn ->close();
?>