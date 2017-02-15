<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogPriority = $data ->backlogPriority;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogPriority = mysqli_real_escape_string($conn, $backlogPriority);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updatePrioritySql = "UPDATE `backlog` SET `backlogPriority`='$backlogPriority' WHERE `backlogId` = $backlogId";
if($conn -> query($updatePrioritySql)){
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