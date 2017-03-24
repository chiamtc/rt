<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogId = $data -> backlogId;
$response = array();
if(!empty($backlogId)){
	$getVersionSql = "SELECT * FROM `releases` r join `releaseBacklog` rb on rb.releaseId = r.releaseId where rb.backlogId = $backlogId";
	$resultGetVersion = $conn -> query($getVersionSql);
	$response["version"] = array();
	$version = array();
	if($resultGetVersion -> num_rows >0){
		$rowGetVersion = $resultGetVersion -> fetch_assoc();
		
		$version["versionName"] = $rowGetVersion["releaseName"];
		$version["versionId"] = $rowGetVersion["releaseId"];
		array_push($response["version"], $version);
		$response["success"] = 1;
		$response["message"] = "release found";
		echo json_encode($response);
		
	}else{
		$version["versionName"] = "Unassigned";
		$version["versionId"] = 0;
		array_push($response["version"], $version);
		$response["success"] = 0;
		$response["message"] = "release not found";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>