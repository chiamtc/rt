<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
//$projectKey = $_GET['projectKey'];
$sprintId = $data -> sprintId;
$backlogSP = $data -> backlogSP;
$backlogBV = $data -> backlogBV;
$eachDay = $data ->eachDay;
$response = array();
if(!empty($sprintId)){
		$updateSprintPts = "Update `sprint` SET `backlogRemainSP` =`backlogRemainSP`-  $backlogSP , `backlogRemainBV` = `backlogRemainBV` - $backlogBV where `sprintId` = $sprintId";
		if($conn->query($updateSprintPts)){
			$checkExistBurndown = "select * from `analytics` where `sprintId` = $sprintId and `eachDay` = '$eachDay'";
			$resultExist = $conn->query($checkExistBurndown);
				
			if($resultExist -> num_rows ==0){
				$selectPtsSql = "SELECT `backlogRemainBV`, `backlogRemainSP` from `sprint` where `sprintId` = $sprintId";
				$resultSelectPts = $conn ->query($selectPtsSql);
				$rowSelectPts = $resultSelectPts -> fetch_assoc();
				$createBurndownSql = "INSERT INTO `analytics`(`analyticsId`, `eachDay`,`backlogRemainSP`,`backlogRemainBV`,`sprintId`) VALUES ('','$eachDay',". $rowSelectPts['backlogRemainSP']. ",".$rowSelectPts['backlogRemainBV'].",$sprintId)";
				if($conn ->query($createBurndownSql)){
					$response["success"] = 1;
					$response["mesage"] = $createBurndownSql;
					
					echo json_encode($response);
				}else{
					$response["success"] = 0;
					$response["message"] = $createBurndownSql;
					echo json_encode($response);
				}
			}else{
				$updateAnalyticsPts = "Update `analytics` SET `backlogRemainSP` =`backlogRemainSP`-  $backlogSP , `backlogRemainBV` = `backlogRemainBV` - $backlogBV where `sprintId` = $sprintId AND `eachDay` = '$eachDay'";
				if($conn->query($updateAnalyticsPts)){
					$response["success"] = 1;
					$response["mesage"] = "analytics updated too";
					
					echo json_encode($response);
				}
			} // check if there is today's date
		}// if update sprint backlog pts can run
}else{
	$response["success"] = 2;
	$response["message"] = $sprintId;
	echo json_encode($response);
}
$conn ->close();
?>
?>