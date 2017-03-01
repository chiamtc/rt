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
	$getSprintSql = "Select * from `sprint` where `projectKey` = '$projectKey'";
	$resultGetSprint = $conn ->query($getSprintSql);
	if($resultGetSprint -> num_rows > 0){
		$response["activeSprints"] = array();
		$sprint = array();
		while($rowGetSprint = $resultGetSprint -> fetch_assoc()){
			$sprint["sprintId"] = $rowGetSprint["sprintId"];
			$sprint["sprintStartDate"] = $rowGetSprint["sprintStartDate"];
			$sprint["sprintEndDate"] = $rowGetSprint["sprintEndDate"];
			
			$getSprintBacklogSql = "SELECT SUM(b.`backlogStoryPoint`) FROM `backlog` b join `sprint` s on b.`sprintId` = s.`sprintId` where s.`projectKey` = 'TP123' AND s.`sprintId` =". $sprint["sprintId"];
			$resultsBacklogSprint = $conn ->query($getSprintBacklogSql);
			$sprint["backlogs"] = array();
			$backlog = array();
			if($resultsBacklogSprint -> num_rows > 0){
				
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
?>