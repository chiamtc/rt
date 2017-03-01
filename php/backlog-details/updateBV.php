<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogBusinessValue = $data ->backlogBusinessValue;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogBusinessValue = mysqli_real_escape_string($conn, $backlogBusinessValue);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();
	$updateBVSql = "UPDATE `backlog` SET `backlogBusinessValue`='$backlogBusinessValue' , `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId";
if($conn -> query($updateBVSql)){
	$response["success"] = 1;
	$response["message"] = "backlog BV updated";
	echo json_encode($response);
}else{
	$response["success"] = 0;
	$response["message"] = "backlog BV update failed";
	echo json_encode($response);
}
$conn ->close();
?>