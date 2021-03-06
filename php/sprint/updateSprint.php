<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$backlogId = $data ->backlogId;
$backlogStatus = $data -> backlogStatus;
$dateModified = $data -> dateModified;
$projectKey = $data->projectKey;
$backlogTotalSP = $data ->backlogTotalSP;
$backlogTotalBV = $data ->backlogTotalBV;
$oldSprintId = $data ->oldSprintId;
date_default_timezone_set("Australia/Brisbane");
$today = Date("Y-m-d");
$sprintId = mysqli_real_escape_string($conn, $sprintId);
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$backlogStatus = mysqli_real_escape_string($conn, $backlogStatus);

$response = array();
$updateSprintSql = "";
if($backlogStatus == 'Regressed' || $backlogStatus =='Rejected'){
	if($backlogStatus =='Regressed'){
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Regressed' WHERE `backlogId` = $backlogId";
	}else if ($backlogStatus =='Rejected'){
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Rejected' WHERE `backlogId` = $backlogId";
	}
	$updateAnalyticsPts2 = "Update `analytics` SET `backlogRemainSP` =`backlogRemainSP` -  $backlogTotalSP,`backlogRemainBV` = `backlogRemainBV` - $backlogTotalBV where `sprintId` = $sprintId AND `eachDay` = '$today'";
}else{
	if($sprintId == 0){
		
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Unassigned' WHERE `backlogId` = $backlogId";
	}else{
		$updateSprintSql = "UPDATE `backlog` SET `sprintId`=$sprintId , `date_modified` = '$dateModified' ,`backlogStatus` = 'Assigned to sprint' WHERE `backlogId` = $backlogId";
	}
}
if($conn -> query($updateSprintSql)){
	$updateSprintPts = "UPDATE `sprint` SET `backlogTotalSP` = `backlogTotalSP` + $backlogTotalSP, `backlogRemainSP` = `backlogRemainSP` + $backlogTotalSP, `backlogTotalBV` =`backlogTotalBV` + $backlogTotalBV , `backlogRemainBV` = `backlogRemainBV` + $backlogTotalBV where `sprintId` = $sprintId and `projectKey` = '$projectKey'";
	if($conn -> query($updateSprintPts)){
		$checkExistBurndown = "select * from `analytics` where `sprintId` = $oldSprintId and `eachDay` = '$today'";
			$resultExist = $conn->query($checkExistBurndown);
			if($resultExist -> num_rows >0){
				$rowExist = $resultExist -> fetch_assoc();
			
			$selectPtsSql = "SELECT `backlogRemainBV`, `backlogRemainSP` from `sprint` where `sprintId` = $oldSprintId";
			$resultSelectPts = $conn ->query($selectPtsSql);
			$rowSelectPts = $resultSelectPts -> fetch_assoc();	
			if($resultExist -> num_rows ==0){
				
				$createBurndownSql = "INSERT INTO `analytics`(`analyticsId`, `eachDay`,`backlogRemainSP`,`backlogRemainBV`,`sprintId`) VALUES ('','$today',". $rowSelectPts['backlogRemainSP']. ",".$rowSelectPts['backlogRemainBV'].",$oldSprintId)";
				$resultcreate = $conn ->query($createBurndownSql);
					
			}else{
				$updateAnalyticsPts = "Update `analytics` SET `backlogRemainSP` =`backlogRemainSP` -  $backlogTotalSP,`backlogRemainBV` = `backlogRemainBV` - $backlogTotalBV where `sprintId` = $oldSprintId AND `eachDay` = '$today'";
				$conn->query($updateAnalyticsPts);
					
				
			} // check if there is today's date
			
		}$updateOldSprintPts = "UPDATE `sprint` SET `backlogTotalSP` = `backlogTotalSP` - $backlogTotalSP, `backlogRemainSP` = `backlogRemainSP` - $backlogTotalSP,`backlogTotalBV` = `backlogTotalBV` - $backlogTotalBV,  `backlogRemainBV` = `backlogRemainBV` - $backlogTotalBV where `sprintId` = $oldSprintId and `projectKey` = '$projectKey'";
			$conn ->query($updateOldSprintPts);
			include 'getSprints.php';
	}else{
		$response["success"] = 1;
		$response["message"] = $updateSprintPts;
		echo json_encode($response);
	}
}else{
	$response["success"] = 0;
	$response["message"] = $updateSprintSql;
	echo json_encode($response);
}
//$conn ->close();
?>