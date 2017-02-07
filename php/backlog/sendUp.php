<?php

$data = json_decode(file_get_contents('php://input'));
$dummyData = $data -> dummyData;

$response = array();
$response["message"] = $dummyData. " hey, from php";
$response["success"] = 1;

echo json_encode($response);
?>