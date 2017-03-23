<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$releaseName = $data -> releaseName;
$releaseDesc = $data -> releaseDesc;
$releaseStartDate = $data -> releaseStartDate;
$releaseEndDate = $data -> releaseEndDate;
$projectKey = $data -> projectKey; 
$releaseName = mysqli_real_escape_string($conn, $releaseName);
$releaseNote = mysqli_real_escape_string($conn, $releaseNote);
$releaseStartDate = mysqli_real_escape_string($conn, $releaseStartDate);
$releaseEndDate = mysqli_real_escape_string($conn, $releaseEndDate);
$projectKey = mysqli_real_escape_string($conn, $projectKey);
$releaseStatus = 'Unreleased';
$response = array();
if(!empty($releaseName) && !empty($projectKey)){
	$createReleaseSql = "INSERT INTO `releases`(`releaseId`, `releaseName`, `releaseStartDate`, `releaseEndDate`, `releaseDesc`, `releaseStatus`, `projectKey`) VALUES('', '$releaseName','$releaseStartDate', '$releaseEndDate', '$releaseDesc', '$releaseStatus','$projectKey')";
	if($conn -> query($createReleaseSql)){
			
		$response["releases"] = array();
		$release = array();
			
		$release["releaseId"] = $conn->insert_id;
		$release["releaseName"]= $releaseName;
		$release["releaseStartDate"] = $releaseStartDate;
		$release["releaseEndDate"] = $releaseEndDate;
		$release["releaseDesc"] = $releaseDesc;
		$release["releaseStatus"] = $releaseStatus;

		array_push($response["releases"], $release);
			
		$response["success"] = 1;
		$response["message"] = "release created";
		echo json_encode($response);
		
	}else{
		$response["success"] = 0;
		$response["message"] = "release failed to create";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}

$conn ->close();
?>