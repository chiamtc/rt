<?php
include "../db_connection.php";

$data = json_decode(file_get_contents("php://input"));
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();

if(!empty($projectKey)){

	$checkProjectKeySql = "Select * from `project` where `projectKey` = '$projectKey'";
	$resultCheckProjectKey = $conn -> query($checkProjectKeySql);
		
	if($resultCheckProjectKey -> num_rows ==0){
		$response["success"]= 1;
		$response["message"] = "key_available";
		echo json_encode($response);
		
	}else{
		$response["success"]= 0;
		$response["message"] = "key_used";
		echo json_encode($response);
	}
	
}else{
	$response["success"]= 3;
	$response["message"] = "empty_fields";
	echo json_encode($response);
}

$conn ->close();
?>