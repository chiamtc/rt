<?php
require "db_connection.php";
$projectName = mysqli_real_escape_string($conn, $_POST['projectName']);
$projectDescription = mysqli_real_escape_string($conn, $_POST['projectDesc']);
date_default_timezone_set("Australia/Brisbane");
$date_created = date("Y/m/d");
$last_id =0;
$response= array();
if(isset($projectName) && isset($projectDescription)){
	$sqlCreateProject = "INSERT INTO `project`(`projectID`, `projectName`, `projectDescription`, `date_created`)
							VALUES('', '$projectName', '$projectDescription', '$date_created')";
	if($conn -> query($sqlCreateProject)){
		$last_id = $conn ->insert_id;
		
	}else{
		$response["success"]= 0;
		$response["message"] = "failed to create in project";
		echo json_encode($response);
	}
	
	$sqlToUserProject ="INSERT INTO `userproject`(`uid`,`projectId`)
						select u.uid, p.projectId from 
						(select `uid` from `user` where `uid` =".$_COOKIE['uid'].") u join
						(select `projectId` from `project`where `projectId`=".$last_id.") p";
						
		if($conn ->query($sqlToUserProject)){
			$response["success"] = 1;
			$response["message"]= $projectName;
			echo json_encode($response);
		}
		else{
			$response["success"]= 0;
			$response["message"] = "failed to create in both tables";
			echo json_encode($response);
		}
	}else{
		$response["success"] =0;
		$response["message"] = "inputs are empty";
		echo json_encode($response);
	}
$conn ->close();
?>