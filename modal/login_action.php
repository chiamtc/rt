<?php
require "db_connection.php";

$email = mysqli_real_escape_string($conn, $_POST["email"]);
$password = crypt(mysqli_real_escape_string($conn, $_POST["password"]), '$6$rounds=1000$salted$');
$response = array();
if(isset($email) && isset($password)) {
    $sql = "SELECT * FROM `user` WHERE `email` = '$email'";
	$result = $conn-> query($sql);
    
	if ($result -> num_rows > 0) {
		$row =$result ->fetch_assoc();
        
        if ( (strcmp($row["password"], $password) == 0 ) ) {
			$response["success"]=0;
            $response["message"]= "successful";
			setcookie("uid", $row["uid"], time()+(86400 * 30), "/");
			setcookie("email", $row["email"], time()+(86400 * 30), "/");
			echo json_encode($response);
			
        }else{
            $response["success"]=1;
            $response["message"]= "incorrect password";
            echo json_encode($response);
        }
	} else {
		$response["success"]=2;
        $response["message"]="no such user";
        echo json_encode($response);
	}
}

$conn->close();
?>