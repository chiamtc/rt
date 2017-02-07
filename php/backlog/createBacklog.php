<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogName = $data -> backlogName;
$backlogType = $data -> backlogType;
$backlogDesc = $data -> backlogDesc;
$backlogPriority = $data -> backlogPriority;
$backlogCreator = $data -> backlogCreator;
$projectKey = $data-> projectKey;
$uid = $_COOKIE['uid'];
$response = array();

$backlogTitle = mysqli_real_escape_string($conn, $backlogName);
$backlogType = mysqli_real_escape_string($conn, $backlogType);
$backlogDesc = mysqli_real_escape_string($conn, $backlogDesc);
$backlogPriority = mysqli_real_escape_string($conn, $backlogPriority);
$backlogCreator = mysqli_real_escape_string($conn, $backlogCreator);
$projectKey = mysqli_real_escape_string($conn, $projectKey);
date_default_timezone_set("Australia/Brisbane");
$date_created = date("Y/m/d");
$time_created = date("h:i:sa");
$backlogId = 0;
if(!empty($backlogName) && !empty($backlogType) && !empty($backlogPriority) && !empty($backlogCreator) && !empty($projectKey)){
	$createBacklogSql = "INSERT INTO `backlog`(`backlogId`, `backlogType`, `backlogTitle`, `backlogPriority`,`backlogDesc`,  `date_created`, `time_created`, `backlogCreator`)VALUES('', '$backlogType', '$backlogTitle', '$backlogPriority','$backlogDesc', '$date_created', '$time_created','$backlogCreator')";
	if($conn ->query($createBacklogSql)){
		$backlogId = $conn -> insert_id;
		
		$updateUpbSql = "INSERT INTO `upb`(`uid`,`projectKey`,`backlogId`)VALUES($uid, '$projectKey', $backlogId)";
		if($conn ->query($updateUpbSql)){
			$response["backlog"] = array();
			$backlog = array();
			$backlog["backlogTitle"] = $backlogTitle;
			$backlog["backlogType"] = $backlogType;
			$backlog["backlogDesc"] = $backlogDesc;
			$backlog["backlogPriority"] = $backlogPriority;
			$backlog["backlogCreator"] = $backlogCreator;
			$backlog["dateCreated"] = $dateCreated;
			$backlog["timeCreated"] = $timeCreated;
			
			array_push($response["backlog"], $backlog);
			$response["success"] = 1;
			
			echo json_encode($response);
		}else{
			$response["message"]= "server error 2";
			$response["success"] = 2;
			echo json_encode($response);
		}
	}else{
		$response["message"] = "server error 1";
		$response["success"] = 0;
			echo json_encode($response);
	}
}else{
	$response["message"] = "fields empty";
	$response["success"] = 3;
	echo json_encode($response);
}

$conn -> close();
?>