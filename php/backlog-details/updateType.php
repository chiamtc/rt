<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogType = $data ->backlogType;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogType = mysqli_real_escape_string($conn, $backlogType);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateTypeSql = "UPDATE `backlog` SET `backlogType`='$backlogType' WHERE `backlogId` = $backlogId";
if($conn -> query($updateTypeSql)){
	$response["success"] = 1;
	$response["message"] = "backlog type updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "backlog type update failed";
	echo json_encode($response);
}
$conn ->close();
?>