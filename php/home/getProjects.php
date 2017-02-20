<?php
include '../db_connection.php';
include '../functions.php';
$response = array();
$uid = mysqli_real_escape_string($conn, $_COOKIE['uid']);
if(!empty($uid)){
	$getProjectSql = "SELECT * FROM `project` p inner join `userproject` up ON p.`projectKey` = up.`projectKey` where up.`uid` = $uid";
	$resultGetProjects = $conn ->query($getProjectSql);
	if($resultGetProjects -> num_rows >=1){
		
		$response["projects"] = array();
		while($rowGetProjects = $resultGetProjects ->  fetch_assoc()){
			$project = array();
			$project["projectKey"] = $rowGetProjects["projectKey"];
			/** getting count of each particular project **/
				$getMemberSql = "select count(`uid`) as projectTotalMembers from `userproject` where `projectKey` ="."'".$rowGetProjects["projectKey"]."'";
				$resultGetMemberSql = $conn ->query($getMemberSql);
				$rowGetMemberSql = $resultGetMemberSql -> fetch_assoc();
			$project["projectMembers"] = $rowGetMemberSql["projectTotalMembers"];
			$project["projectName"] = $rowGetProjects["projectName"];
			$project["projectDesc"] = $rowGetProjects["projectDescription"];
			$project["projectSeo"] = seoUrl($rowGetProjects["projectName"]);
			$project["dateCreated"] = $rowGetProjects["date_created"];
			array_push($response["projects"], $project);
		}
		$response["success"] = 1;
		echo json_encode($response);
	}else{
		$response["success"] = 0;
		$response["message"] = "no_projects";
		echo json_encode($response);
	}
}else{
	$response["success"] = 2;
	$response["message"] = "uid_is_empty";
	echo json_encode($response);
}
$conn ->close();
?>