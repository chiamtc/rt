<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogDesc = $data ->backlogDesc;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogDesc = mysqli_real_escape_string($conn, $backlogDesc);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateDescSql = "UPDATE `backlog` SET `backlogDesc`='$backlogDesc', `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId";
if($conn -> query($updateDescSql)){
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