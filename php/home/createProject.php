<?php 
include '../db_connection.php';
include '../functions.php';
$data = json_decode(file_get_contents("php://input"));
$projectName = $data -> projectName;
$projectDesc = $data -> projectDesc;
$projectKey = $data ->projectKey;
$date_created = $data -> dateCreated;
$projectName = mysqli_real_escape_string($conn, $projectName);
$projectDesc = mysqli_real_escape_string($conn, $projectDesc);
$projectKey = mysqli_real_escape_string($conn, $projectKey);
$uid = mysqli_real_escape_string($conn, $_COOKIE['uid']);
$response = array();
$projectSeo = seoUrl($projectName);

if(!empty($projectName) && !empty($projectDesc) && !empty($projectKey)){
	
	$checkProjectKeySql = "Select * from `project` where `projectKey` = '$projectKey'";
	$resultCheckProjectKey = $conn -> query($checkProjectKeySql);
		
	if($resultCheckProjectKey -> num_rows ==0){
		$sqlCreateProject = "INSERT INTO `project`(`projectKey`, `projectName`, `projectDescription`,`date_created`)
							VALUES('$projectKey', '$projectName', '$projectDesc','$date_created')";
							
		if($conn -> query($sqlCreateProject)){
			$sqlToUserProject ="INSERT INTO `userproject`(`uid`,`projectKey`)
						select u.uid, p.projectKey from 
						(select `uid` from `user` where `uid` =".$_COOKIE['uid'].") u join
						(select `projectKey` from `project`where `projectKey`='$projectKey') p";
						
			if($conn ->query($sqlToUserProject)){
				$response["project"] = array();
				$project = array();
				$project["projectKey"] = $projectKey;
				$project["projectName"] = $projectName;
				$project["projectSeo"] = $projectSeo;
				$project["dateCreated"] = $date_created;
				$project["projectMembers"] = 1;
				array_push($response["project"], $project);
				$response["success"] = 1;
				echo json_encode($response);
			}
			else{
				$response["success"]= 3;
				$response["message"] = "server error 2";
				echo json_encode($response);
			}
		}else{
			$response["success"]= 0;
			$response["message"] = "server error";
			echo json_encode($response);
		}
	}else{
		$response["success"]= 2;
		$response["message"] = "key_used";
		echo json_encode($response);
	}
	
	
		
}else{
		$response["success"] =4;
		$response["message"] = "inputs are empty";
		echo json_encode($response);
}
$conn ->close();

?>