<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$releaseId = $data -> releaseId;
//$projectKey = $_GET['projectKey'];
$response= array();

$deleteReleaseBacklogSql = "DELETE FROM `releaseBacklog` where releaseId = $releaseId";
if($conn -> query($deleteReleaseBacklogSql)){
	$deleteActualReleaseSql = "DELETE FROM `releases` where releaseId = $releaseId";
	if($conn->query($deleteActualReleaseSql)){
		$response["message"]= "deleted everything";
		$response["success"] = 1;
		echo json_encode($response);
	}else{
		$response["message"]= "not everything deleted";
		$response["success"] = 2;
		echo json_encode($response);
	}
}else{
	$response["success"] = 0;
	$response["message"]= "can't delete anything";
	echo json_encode($response);
}
$conn ->close();
?>