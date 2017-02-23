<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$projectKey = $data -> projectKey;
$projectKey = mysqli_real_escape_string($conn, $projectKey);

$response = array();
if(!empty($projectKey)){
	//$getSprintSql = "SELECT * FROM `sprint` s left join `backlog` b on s.sprintId = b.sprintId where s.projectKey = '$projectKey'";
	$getSprintSql = "Select * from `sprint` where `projectKey` = '$projectKey' AND `sprintStatus` = 'Active'";
	$resultGetSprint = $conn ->query($getSprintSql);
	if($resultGetSprint -> num_rows > 0){
		$sprint = array();
		while($rowGetSprint = $resultGetSprint -> fetch_assoc()){
			$sprint["sprintId"] = $rowGetSprint["sprintId"];
			$sprint["sprintStatus"] = $rowGetSprint["sprintStatus"];
		
			$getSprintBacklogSql = "Select * from `backlog` where `sprintId` =". $sprint["sprintId"]. ";";
			$resultsBacklogSprint = $conn ->query($getSprintBacklogSql);
			
			$backlog = array();
			if($resultsBacklogSprint -> num_rows > 0){
				
				while($rowBacklogSprint = $resultsBacklogSprint -> fetch_assoc()){
					
					$backlog["backlogId"] = $rowBacklogSprint["backlogId"];
					$backlog["backlogStatus"] = $rowBacklogSprint["backlogStatus"];
					$backlogId = $rowBacklogSprint["backlogId"];
						$getTaskSql = "select * from `tasks` where `backlogId` =". $rowBacklogSprint['backlogId']. " AND `tasksStatus` != 'Done'";
						
						$resultBacklogTask = $conn -> query($getTaskSql);
						$backlog["tasks"] = array();
						$task = array();
						if($rowTask = $resultBacklogTask -> num_rows !=0){
							$regress = 0;
							$done = 0;
							$regressBacklogSql = "update `backlog` SET `backlogStatus` = 'Regressed', `sprintId` = 0 where `backlogId` = $backlogId";
							if($conn -> query($regressBacklogSql)){
								$response["regress"] = $regress + 1;
							}else{
								$response["message"] = $regressBacklogSql;
							}
						}else{
							$doneBacklogSql = "update `backlog` SET `backlogStatus` = 'Done' where `backlogId` = $backlogId";
							if($conn -> query($doneBacklogSql)){
								$response["done"] = $done + 1;
							}else{
								$response["message"] = $doneBacklogSql;
							}
						}
				}
			}
		}
		$completeSprintSql= "update `sprint` SET `sprintStatus` = 'Done' where `projectKey` = '$projectKey'";
		if($conn ->  query($completeSprintSql)){
			$response["success"] = 1;
			echo json_encode($response);
		}else{
			$response["success"] = 2;
			echo json_encode($response);
		}
		
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