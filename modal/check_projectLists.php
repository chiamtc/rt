<?php
require "db_connection.php";

$sql_checkProject = "select * from p.project inner join up.userproject on up.userproject = 1";
$result = $conn -> query($sql_checkProject);
$response = array();

?>