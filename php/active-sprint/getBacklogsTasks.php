<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
$response["found"] = false;
if(!empty($projectKey)){
	//$getSprintSql = "SELECT * FROM `sprint` s left join `backlog` b on s.sprintId = b.sprintId where s.projectKey = '$projectKey'";
	$getSprintSql = "Select * from `sprint` where `projectKey` = '$projectKey' AND `sprintStatus` = 'Active'";
	$resultGetSprint = $conn ->query($getSprintSql);
	if($resultGetSprint -> num_rows > 0){
		$response["activeSprints"] = array();
		$sprint = array();
		while($rowGetSprint = $resultGetSprint -> fetch_assoc()){
			$sprint["sprintId"] = $rowGetSprint["sprintId"];
			$sprint["sprintStatus"] = $rowGetSprint["sprintStatus"];
 			$sprint["sprintGoal"] = $rowGetSprint["sprintGoal"];
			$sprint["sprintStartDate"] = $rowGetSprint["sprintStartDate"];
			$sprint["sprintEndDate"] = $rowGetSprint["sprintEndDate"];
			if($sprint["sprintStatus"] == 'Active'){
				$response["found"] = true;
			}
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
					$backlog["dateModified"] = $rowBacklogSprint["date_modified"];
					$backlog["backlogCreator"] = $rowBacklogSprint["backlogCreator"];
					$backlog["backlogStatus"] = $rowBacklogSprint["backlogStatus"];
					$backlog["drag"] =true;
					$backlogId = $rowBacklogSprint["backlogId"];
						$getTaskSql = "select * from `tasks` where `backlogId` =". $rowBacklogSprint['backlogId'];
						
						$resultBacklogTask = $conn -> query($getTaskSql);
						$backlog["tasks"] = array();
						$task = array();
						if($rowTask = $resultBacklogTask -> num_rows >0){
							while($rowTask = $resultBacklogTask ->fetch_assoc()){
								$task["tasksId"] = $rowTask["tasksId"];
								$task["tasksTitle"] = $rowTask["tasksTitle"];
								$task["tasksDesc"] = $rowTask["tasksDescription"];
								$task["tasksStatus"] = $rowTask["tasksStatus"];
								$task["dateCreated"] = $rowTask["date_created"];
								$task["dateModified"] = $rowTask["date_modified"];
								$task["backlogId"] = $rowTask["backlogId"];
								array_push($backlog["tasks"], $task);
							}
						}else{
							$task["tasksTitle"] = "Empty status, drag one to update";
							$task["tasksStatus"] = "??";
							array_push($backlog["tasks"], $task);
						}
					array_push($sprint["backlogs"], $backlog);
				}
			}else{
				$backlog["backlogTitle"] = "Drag a backlog here :) !";
				$backlog["backlogPriority"] = "Unknown";
				$backlog["backlogStoryPoint"] = "-";
				$backlog["backlogType"] = "Not even created";
				$backlog["drag"] = false;
				array_push($sprint["backlogs"], $backlog);
			}
			array_push($response["activeSprints"], $sprint);
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