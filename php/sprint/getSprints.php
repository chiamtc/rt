<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
if(!empty($projectKey)){
	//$getSprintSql = "SELECT * FROM `sprint` s left join `backlog` b on s.sprintId = b.sprintId where s.projectKey = '$projectKey'";
	$getSprintSql = "Select * from `sprint` where `projectKey` = '$projectKey'";
	$resultGetSprint = $conn ->query($getSprintSql);
	if($resultGetSprint -> num_rows > 0){
		$response["sprints"] = array();
		$sprint = array();
		while($rowGetSprint = $resultGetSprint -> fetch_assoc()){
			$sprint["sprintId"] = $rowGetSprint["sprintId"];
 			$sprint["sprintGoal"] = $rowGetSprint["sprintGoal"];
			$sprint["sprintStartDate"] = $rowGetSprint["sprintStartDate"];
			$sprint["sprintEndDate"] = $rowGetSprint["sprintEndDate"];
			
			$getSprintBacklogSql = "Select * from `backlog` where `sprintId` =". $sprint["sprintId"]. ";";
			$resultsBacklogSprint = $conn ->query($getSprintBacklogSql);
			$sprint["backlogs"] = array();
			$backlog = array();
			if($resultsBacklogSprint -> num_rows > 0){
				
				while($rowBacklogSprint = $resultsBacklogSprint -> fetch_assoc()){
					
					$backlog["backlogId"] = $rowBacklogSprint["backlogId"];
					$backlog["backlogType"] = $rowBacklogSprint["backlogType"];
					$backlog["backlogTitle"] = $rowBacklogSprint["backlogTitle"];
					$backlog["backlogDesc"] = $rowBacklogSprint["backlogDesc"];
					$backlog["backlogPriority"] = $rowBacklogSprint["backlogPriority"];
					$backlog["backlogStoryPoint"] = $rowBacklogSprint["backlogStoryPoint"];
					$backlog["dateCreated"] = $rowBacklogSprint["date_created"];
					$backlog["backlogCreator"] = $rowBacklogSprint["backlogCreator"];
					$backlog["backlogStatus"] = $rowBacklogSprint["backlogStatus"];
					array_push($sprint["backlogs"], $backlog);
				}
			}else{
				$backlog["backlogTitle"] = "Drag a backlog here :) !";
				$backlog["backlogPriority"] = "Unknown";
				$backlog["backlogType"] = "Not even created";
				array_push($sprint["backlogs"], $backlog);
			}
			array_push($response["sprints"], $sprint);
		}
		$response["success"] = 1;
		echo json_encode($response);
	}else{
		$response["success"] = 0;
		$response["message"] = "no sprint found";
		echo json_encode($response);
	}
	
}else{
	$response["success"] = 2;
	$response["message"] = "empty project key";
	echo json_encode($response);
}
$conn ->close();
?>