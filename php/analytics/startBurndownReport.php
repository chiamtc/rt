<?php 
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$sprintId = $data ->sprintId;
$eachDay = $data -> eachDay;
$backlogTotalSP = $data ->backlogSP;
$backlogTotalBV = $data ->backlogBV;
$sprintId = mysqli_real_escape_string($conn, $sprintId);

$response = array();
if(!empty($sprintId)){
	$createBurndownSql = "INSERT INTO `analytics`(`analyticsId`, `eachDay`,`backlogRemainSP`,`backlogRemainBV`,`sprintId`) VALUES ('','$eachDay',$backlogTotalSP,$backlogTotalBV,$sprintId)";
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
	$response["success"] = 0;
	$response["message"] = $updateSprintSql;
	echo json_encode($response);
}
//$conn ->close();
?>