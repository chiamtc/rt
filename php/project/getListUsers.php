<?php
include '../db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$projectKey = $data -> projectKey;

$projectKey = mysqli_real_escape_string($conn, $projectKey);
$response = array();

if(!empty($projectKey) ){
	$getListUsersSql = "Select * from `user` u join `userproject` up on u.`uid` = up.`uid` where up.`projectKey` = '$projectKey'";
	$resultListUsers = $conn-> query($getListUsersSql);
	
	if($resultListUsers -> num_rows >0){
		$response["users"] = array();
		while($rowListUsers = $resultListUsers -> fetch_assoc()){
			$user = array();
			$user["uid"] = $rowListUsers['uid'];
			$user["email"] = $rowListUsers["email"];
			array_push($response["users"], $user);
		}
		$response["success"]=1;
		echo json_encode($response);
	}else{
		$response["success"]= 0;
		$response["message"] = "no users in this project";
		echo json_encode($response);
	}
	
}else{
	$response["success"]= 3;
	$response["message"] = "empty project key";
	echo json_encode($response);
}
$conn ->close();
?>