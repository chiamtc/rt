<?php
include '../db_connection.php';
$data = json_decode(file_get_contents('php://input'));
$backlogName = $data -> backlogName;
$backlogType = $data -> backlogType;
$backlogDesc = $data -> backlogDesc;
$backlogPriority = $data -> backlogPriority;
$backlogStoryPoint=  $data ->backlogStoryPoint;
$backlogBusinessValue = $data -> backlogBusinessValue;
$backlogCreator = $data -> backlogCreator;
$projectKey = $data-> projectKey;
$date_created = $data ->dateCreated;
$date_modified = $data -> dateModified;
$uid = $_COOKIE['uid'];
$response = array();

$backlogTitle = mysqli_real_escape_string($conn, $backlogName);
$backlogType = mysqli_real_escape_string($conn, $backlogType);
$backlogDesc = mysqli_real_escape_string($conn, $backlogDesc);
$backlogPriority = mysqli_real_escape_string($conn, $backlogPriority);
$backlogStoryPoint = mysqli_real_escape_string($conn, $backlogStoryPoint);
$backlogBusinessValue = mysqli_real_escape_string($conn, $backlogBusinessValue);
$backlogCreator = mysqli_real_escape_string($conn, $backlogCreator);
$projectKey = mysqli_real_escape_string($conn, $projectKey);
$backlogId = 0;

if(!empty($backlogName) && !empty($backlogType) && !empty($backlogPriority) && !empty($backlogCreator) && !empty($projectKey)){
	if(empty($backlogStoryPoint)){
		$backlogStoryPoint = 0;
	}
	$createBacklogSql = "INSERT INTO `backlog`(`backlogId`, `backlogType`, `backlogTitle`, `backlogPriority`,`backlogStoryPoint`,`backlogDesc`,  `date_created`, `date_modified`,`backlogCreator`, `backlogStatus`, `backlogBusinessValue`,`sprintId`)VALUES('', '$backlogType', '$backlogTitle', '$backlogPriority',$backlogStoryPoint,'$backlogDesc', '$date_created', '$date_modified','$backlogCreator', 'Unassigned', $backlogBusinessValue,0)";
	if($conn ->query($createBacklogSql)){
		$backlogId = $conn -> insert_id;
		
		$updateUpbSql = "INSERT INTO `upb`(`uid`,`projectKey`,`backlogId`)VALUES($uid, '$projectKey', $backlogId)";
		if($conn ->query($updateUpbSql)){
			$getBacklogSql = "SELECT * FROM `backlog` b join `upb` upb on b.backlogId = upb.backlogId AND b.sprintId = 0 AND upb.projectKey = '$projectKey' AND b.`backlogStatus` != 'Done'";
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
					$backlog["backlogStoryPoint"] = $rowGetBacklogs["backlogStoryPoint"];
					$backlog["dateCreated"] = $rowGetBacklogs["date_created"];
					$backlog["dateModified"] = $rowGetBacklogs["date_modified"];
					$backlog["backlogCreator"] = $rowGetBacklogs["backlogCreator"];
					$backlog["backlogStatus"] = $rowGetBacklogs["backlogStatus"];
					$backlog["backlogBusinessValue"] = $rowGetBacklogs["backlogBusinessValue"];
					array_push($response["backlogs"], $backlog);
				}
				$response["success"]=1;
				echo json_encode($response);
				
			}else{
				$response["success"] = 0;
				$response["message"]= "no backlogs";
				echo json_encode($response);
			}
		}else{
			$response["message"]= "server error 2";
			$response["success"] = 2;
			echo json_encode($response);
		}
	}else{
		$response["message"] = $createBacklogSql;
		$response["success"] = 0;
			echo json_encode($response);
	}
}else{
	$response["message"] = "fields empty";
	$response["success"] = 3;
	echo json_encode($response);
}

$conn -> close();
?>