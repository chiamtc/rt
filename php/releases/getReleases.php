<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
if(!empty($projectKey)){
	//$getSprintSql = "SELECT * FROM `sprint` s left join `backlog` b on s.sprintId = b.sprintId where s.projectKey = '$projectKey'";
	$getReleasesSql = "Select * from `releases` where `projectKey` = '$projectKey'";
	$resultGetReleases = $conn ->query($getReleasesSql);
	if($resultGetReleases -> num_rows > 0){
		$response["releases"] = array();
		
		while($rowGetSprint = $resultGetReleases -> fetch_assoc()){
			$release = array();
			$release["releaseId"] = $rowGetSprint["releaseId"];
			$release["releaseName"] = $rowGetSprint["releaseName"];
 			$release["releaseStartDate"] = $rowGetSprint["releaseStartDate"];
			$release["releaseEndDate"] = $rowGetSprint["releaseEndDate"];
			$release["releaseDesc"] = $rowGetSprint["releaseDesc"];
			$release["releaseStatus"] = $rowGetSprint["releaseStatus"];
			$getReleaseBacklogSql = "Select * from `backlog` b join `releaseBacklog` rb on rb.backlogId = b.backlogId AND rb.releaseId =".$rowGetSprint["releaseId"];
			
			$resultsBacklogRelease = $conn ->query($getReleaseBacklogSql);
			$release["releaseBacklogs"] = array();
			$releaseBacklog = array();
			if($resultsBacklogRelease -> num_rows > 0){
				
				while($rowBacklogSprint = $resultsBacklogRelease -> fetch_assoc()){
					
					$releaseBacklog["backlogId"] = $rowBacklogSprint["backlogId"];
					$releaseBacklog["backlogType"] = $rowBacklogSprint["backlogType"];
					$releaseBacklog["backlogTitle"] = $rowBacklogSprint["backlogTitle"];
					$releaseBacklog["backlogDesc"] = $rowBacklogSprint["backlogDesc"];
					$releaseBacklog["backlogPriority"] = $rowBacklogSprint["backlogPriority"];
					$releaseBacklog["backlogStoryPoint"] = $rowBacklogSprint["backlogStoryPoint"];
					$releaseBacklog["backlogBusinessValue"] = $rowBacklogSprint["backlogBusinessValue"];
					$releaseBacklog["dateCreated"] = $rowBacklogSprint["date_created"];
					$releaseBacklog["dateModified"] = $rowBacklogSprint["date_modified"];
					$releaseBacklog["backlogCreator"] = $rowBacklogSprint["backlogCreator"];
					$releaseBacklog["backlogStatus"] = $rowBacklogSprint["backlogStatus"];
					array_push($release["releaseBacklogs"], $releaseBacklog);
				}
				
			}else{
				array_push($release["releaseBacklogs"], $releaseBacklog);
			}
			array_push($response["releases"], $release);
		}
		$response["success"] = 1;
		echo json_encode($response);
	}else{
		$response["success"] = 0;
		$response["message"] = "no release found";
		echo json_encode($response);
	}
	
}else{
	$response["success"] = 2;
	$response["message"] = "empty project key";
	echo json_encode($response);
}
$conn ->close();
?>