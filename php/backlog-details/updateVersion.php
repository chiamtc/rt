<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$releaseId = $data ->releaseId;
$backlogId = $data ->backlogId;
$dateModified = $data -> dateModified;
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response = array();

$findExistBacklogId = "Select * from `releaseBacklog` where `backlogId` = $backlogId";
$resultExistBacklog = $conn -> query($findExistBacklogId);
if($resultExistBacklog -> num_rows >0){
	if($releaseId == 0){
		$deleteReleaseSql = "DELETE FROM `releaseBacklog` where `backlogId` = $backlogId";
		if($conn->query($deleteReleaseSql)){
			$response["success"] = 1;
			$response["message"] = "backlog release deleted";
		}else{
			$response["success"] = 0;
			$response["message"] = "backlog release delete failed";
		}
	}else{
		$updateExistReleaseSql = "UPDATE `releaseBacklog` SET `releaseId` = $releaseId where `backlogId` = $backlogId";
		if($conn->query($updateExistReleaseSql)){
			$response["success"] = 1;
			$response["message"] = "backlog release updated";
		}else{
			$response["success"] = 0;
			$response["message"] = "backlog release update failed";
		}
	}
}else{
	$createNewReleaseSql = "INSERT INTO `releaseBacklog`(`releaseId`, `backlogId`) VALUES($releaseId, $backlogId)";
	if($conn->query($createNewReleaseSql)){
		$response["success"] = 2;
		$response["message"] = "backlog release created";
	}else{
		$response["success"] = 0;
		$response["message"] = "backlog release update failed";
	}
}

$updateTitleSql = "UPDATE `backlog` SET `date_modified` = '$dateModified' WHERE `backlogId` = $backlogId";
if($conn -> query($updateTitleSql)){
	echo json_encode($response);
}else{
	echo json_encode($response);
}
$conn ->close();
?>