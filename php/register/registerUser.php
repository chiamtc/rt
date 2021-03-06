<?php
include '../db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$email = $data -> email;
$password = $data -> password;
$confPassword = $data -> confPassword;
$date_joined = $data -> dateJoined;
$email = mysqli_real_escape_string($conn, $email);
$password = crypt(mysqli_real_escape_string($conn, $password), '$6$rounds=1000$salted$');
$confPassword = crypt(mysqli_real_escape_string($conn, $confPassword), '$6$rounds=1000$salted$');

$response = array();
if(!empty($email)){
	$getEmailExistSql = "SELECT * FROM `user` WHERE `email`='$email'";
	$resultEmailExist = $conn-> query($getEmailExistSql);

	if ($resultEmailExist -> num_rows == 0) {
		if((strcmp($password, $confPassword) == 0)) {
			
			$sqlRegister = "INSERT INTO `user`(`email`, `password`,`date_joined`)VALUES('$email', '$password','$date_joined')";
			
			if($conn ->query($sqlRegister)){
				$response["success"]= 1;
				$response["message"] = "registered";
				echo json_encode($response);
			}else{
				$response["success"]= 0;
				$response["message"] = "failed_register";
				echo json_encode($response);
			}
			
		} else {
			$response["success"]= 2;
			$response["message"] = "password_not_match";
			echo json_encode($response);
		}
	} else {
		$response["success"]= 3;
		$response["message"] = "email_used";
		echo json_encode($response);
	}
}else{
	$response["success"]= 4;
	$response["message"] = "empty_email";
	echo json_encode($response);
}

$conn->close();

?>