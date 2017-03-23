<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$projectKey = $data -> projectKey;
$tasksId = mysqli_real_escape_string($conn, $sprintId);
date_default_timezone_set("Australia/Brisbane");
$today = Date("Y-m-d");
$response = array();
if(!empty($projectKey)){
	$getBurndownSql = "select a.eachDay, a.backlogRemainSP, a.backlogRemainBV from `analytics` a join `sprint` s on a.`sprintId` = s.`sprintId` where s.`projectKey` = '$projectKey' AND s.sprintStatus = 'Active' order by a.eachDay";
	$resultBurndown = $conn -> query($getBurndownSql);
	if($resultBurndown -> num_rows >0){
		$response["burndown"] = array();
		$burndownDate["eachDay"] = array();
		$burndownSP["backlogRemainSP"]= array();
		$burndownBV["backlogRemainBV"] = array();
		while($rowBurndown = $resultBurndown -> fetch_assoc()){
			
			if($rowBurndown["eachDay"] == '$today'){
				array_push($burndownDate["eachDay"],  $rowBurndown["eachDay"]."(today)");
			}else{
				array_push($burndownDate["eachDay"],  $rowBurndown["eachDay"]);
			}
			array_push($burndownSP["backlogRemainSP"], $rowBurndown["backlogRemainSP"]);
			array_push($burndownBV["backlogRemainBV"], $rowBurndown["backlogRemainBV"]);
			
		}
		array_push($burndownSP["backlogRemainSP"], 0);
		array_push($burndownBV["backlogRemainBV"], 0);
		array_push($response["burndown"], $burndownDate["eachDay"],$burndownSP["backlogRemainSP"], $burndownBV["backlogRemainBV"]);
		$response["success"] = 1;
		echo json_encode($response);
		
	}else{
		$response["success"] = 0;
		$response["message"] = "cant find burndown";
		echo json_encode($response);
	}
}else{
	$response["success"] = 3;
	$response["message"] = "empty sprintId";
	echo json_encode($response);
}

$conn ->close();
?>