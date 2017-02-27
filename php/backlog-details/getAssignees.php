<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogId = $data -> backlogId;
$backlogId = mysqli_real_escape_string($conn, $backlogId);
$response= array();

$getAssigneeSql = "SELECT DISTINCT `assignee` FROM `tasks` WHERE `backlogId` = $backlogId and `assignee` != 'Unassigned'";
$resultAssignee = $conn -> query($getAssigneeSql);
if($resultAssignee -> num_rows >0){
	$response["assignees"] = array();
	while($rowAssignee = $resultAssignee -> fetch_assoc()){
		//$assignee = array();
		//$assignee["assignee"] = $rowAssignee["assignee"];
		
		array_push($response["assignees"], $rowAssignee["assignee"]);
	}
	$response["success"]=1;
	echo json_encode($response);
	
}else{
	$response["success"] = 0;
	$response["message"]= "no assignees";
	echo json_encode($response);
}
$conn ->close();
?>