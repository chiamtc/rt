<?php
include '../db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$email = $data -> email;
$password =  $data ->password;
$email = mysqli_real_escape_string($conn, $email);
$password = crypt(mysqli_real_escape_string($conn, $password), '$6$rounds=1000$salted$');
$response = array();

if(!empty($email) && !empty($password)){
	$getEmailExistSql = "SELECT * FROM `user` WHERE `email`='$email'";
	$resultEmailExist = $conn-> query($getEmailExistSql);
	
	if ($resultEmailExist -> num_rows ==1) {
		$row = $resultEmailExist ->fetch_assoc();
		if((strcmp($password, $row['password']) == 0)) {
			$response["success"]= 1;
			$response["message"] = "user_found";
			setcookie("uid", $row["uid"], time()+(86400 * 30), "/");
			setcookie("email", $row["email"], time()+(86400 *30), "/");
			echo json_encode($response);
			
		} else {
			$response["success"]= 0;
			$response["message"] = "password_not_match";
			echo json_encode($response);
		}
	} else {
		$response["success"]= 2;
		$response["message"] = "user_not_found";
		echo json_encode($response);
	}
	
}else{
	$response["success"]= 3;
	$response["message"] = "empty_fields";
	echo json_encode($response);
}

$conn ->close();
?>