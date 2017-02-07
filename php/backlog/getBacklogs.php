<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$projectKey = $data -> projectKey;
//$projectKey = $_GET['projectKey'];
$projectKey = mysqli_real_escape_string($conn, $projectKey);
$response= array();

$getBacklogSql = "SELECT * FROM `backlog` b join `upb` upb on b.backlogId = upb.backlogId AND upb.projectKey = '$projectKey'";
$resultGetBacklogs = $conn -> query($getBacklogSql);
if($resultGetBacklogs -> num_rows >0){
	$response["backlogs"] = array();
	while($rowGetBacklogs = $resultGetBacklogs -> fetch_assoc()){
		$backlog = array();
		$backlog["backlogId"] = $rowGetBacklogs["backlogId"];
		$backlog["backlogType"] = $rowGetBacklogs["backlogType"];
		$backlog["backlogTitle"] = $rowGetBacklogs["backlogTitle"];
		$backlog["backlogDesc"] = $rowGetBacklogs["backlogDesc"];
		$backlog["backlogPriority"] = $rowGetBacklogs["backlogPriority"];
		$backlog["dateCreated"] = $rowGetBacklogs["date_created"];
		$backlog["timeCreated"] = $rowGetBacklogs["time_created"];
		$backlog["backlogCreator"] = $rowGetBacklogs["backlogCreator"];
		
		array_push($response["backlogs"], $backlog);
	}
	$response["success"]=1;
	echo json_encode($response);
	
}else{
	$response["success"] = 0;
	$response["message"]= "no backlogs";
	echo json_encode($response);
}
$conn ->close();
?>