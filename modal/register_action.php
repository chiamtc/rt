<?php
include 'db_connection.php';

$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = crypt(mysqli_real_escape_string($conn, $_POST["password"]), '$6$rounds=1000$salted$');
$passwordRepeat = crypt(mysqli_real_escape_string($conn, $_POST["passwordRepeat"]), '$6$rounds=1000$salted$');
date_default_timezone_set("Australia/Brisbane");
$date_joined = date("Y/m/d");
if(isset($email)){
	$getEmailExistSql = "SELECT * FROM `user` WHERE `email`='$email'";
	$resultEmailExist = $conn-> query($getEmailExistSql);

	if ($resultEmailExist -> num_rows == 0) {
		if((strcmp($password, $passwordRepeat) == 0)) {
			
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