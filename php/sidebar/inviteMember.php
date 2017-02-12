<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$projectKey = $data-> projectKey;
$email = $data -> email;

$projectKey = mysqli_real_escape_string($conn, $projectKey);
$email = mysqli_real_escape_string($conn, $email);
$response = array();
if(!empty($projectKey) && !empty($email)){
	$checkMemberExistSql = "Select * from `user` where `email` = '$email'";
	$resultCheckMember = $conn->query($checkMemberExistSql);
	if($rowCheckMember = $resultCheckMember -> num_rows == 1){
		$rowCheckMember = $resultCheckMember -> fetch_assoc();
		$uid = $rowCheckMember["uid"];
		$inviteMemberSql = "INSERT INTO `userproject` (`uid`, `projectKey`) VALUES ($uid, '$projectKey')";
		if($conn->query($inviteMemberSql)){
			$response["success"] = 1;
			$response["message"] = "user invited";
			echo json_encode($response);
		}else{
			$response["success"] = 0;
			$response["message"] = "user failed to invite";
			echo json_encode($response);
		}	
	}else{
		$response["success"] = 2;
		$response["message"] = "no such user";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty fields";
	echo json_encode($response);
}
$conn ->close();
?>