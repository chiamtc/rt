<?php
require "db_connection.php";
$response= array();

$sqlFindProjects = "Select p.`projectName`, p.`projectDescription` from `project` p 
					INNER JOIN `userproject` up ON p.projectId = up.projectId AND up.uid =".$_COOKIE['uid'];
	$result= $conn -> query($sqlFindProjects);
	if($rowcnt = $result-> num_rows>0){
		$response["projects"]= array();
		
		while($row= $result -> fetch_assoc()){
			$project = array();
			$project["projectName"] = $row["projectName"];
			$project["projectDescription"] = $row["projectDescription"];
			array_push($response["projects"],$project);
		}
		echo json_encode($response);
		
	}else{
		$response["success"]= 0;
		$response["message"] = "No projects related to this user";
		echo json_encode($response);
	}
	
$conn ->close();
?>