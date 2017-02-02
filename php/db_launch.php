<?php

require __DIR__.'/db_connection.php';
require __DIR__.'/db_delete.php';
require __DIR__.'/db_connection.php';
$database = 'rt';
$sql = "CREATE DATABASE " .$database;
if ($conn ->query($sql)) {
	echo "Database created successfully. <br>";
} else {
    echo "Database failed to created <br>" . mysqli_error($conn);
}

session_destroy();

require 'db_connection.php';

$sqltbl = "CREATE TABLE user(
                uid int NOT NULL AUTO_INCREMENT,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                date_joined varchar(255) NOT NULL,
                PRIMARY KEY (uid,email)
            )";

if($conn -> query($sqltbl)){
    echo "tbl user created <br/>";
}else{
    echo "tbl user failed <br/>";
}

$sqltbl2= "CREATE TABLE project(
            projectKey varchar(255) NOT NULL,
			projectName varchar(255) NOT NULL,
			projectDescription text,
			date_created varchar(255) NOT NULL,
            PRIMARY KEY(projectKey)
        )";

if($conn -> query($sqltbl2)){
    echo "tbl project created <br>";
}else{
    echo "tbl project failed to create <br>";
}

$sqltbl3= "CREATE TABLE userproject(
            uid int NOT NULL,
			projectKey varchar(255) NOT NULL,
            PRIMARY KEY(uid,projectKey),
            FOREIGN KEY(uid) REFERENCES user(uid),
            FOREIGN KEY(projectKey) REFERENCES project(projectKey)
        )";

if($conn -> query($sqltbl3)){
    echo "tbl userproject created <br>";
}else{
    echo "tbl userproject failed to create<br>";
}

$sqltbl4 = "CREATE TABLE epic(
            epicId int NOT NULL AUTO_INCREMENT,
            epicDescription text NOT NULL,
			 projectKey varchar(255) NOT NULL,
			PRIMARY KEY(epicId,projectKey),
			FOREIGN KEY(projectKey) REFERENCES project(projectKey)
        )";

if($conn -> query($sqltbl4)){
    echo "tbl epic created <br>";
}else{
    echo "tbl epic failed to create <br>";
}

$sqltbl5 = "CREATE TABLE sprint(
            sprintId int NOT NULL AUTO_INCREMENT,
            sprintGoal text NOT NULL,
			sprintStartDate varchar(255),
			sprintEndDate varchar(255),
			PRIMARY KEY(sprintId)
        )";

if($conn -> query($sqltbl5)){
    echo "tbl sprint created <br>";
}else{
    echo "tbl sprint failed to create <br>";
}

$sqltbl6 = "CREATE TABLE usrstories(
            usrstoriesId int NOT NULL AUTO_INCREMENT,
            usrstoriesDescription text NOT NULL,
			epicId int NOT NULL,
			sprintId int NOT NULL,
			PRIMARY KEY(usrstoriesId,epicId,sprintId),
			FOREIGN KEY(epicId) REFERENCES epic(epicId),
			FOREIGN KEY(sprintId) REFERENCES sprint(sprintId)
        )";

if($conn -> query($sqltbl6)){
    echo "tbl usrstories created<br>";
}else{
    echo "tbl usrstories failed to create<br>";
}

$sqltbl7 = "CREATE TABLE tasks(
            tasksId int NOT NULL AUTO_INCREMENT,
			tasksDescription text NOT NULL,
			tasksType varchar(255) NOT NULL,
			tasksStatus varchar(255) NOT NULL,
			usrstoriesId int NOT NULL,
			PRIMARY KEY(tasksId,usrstoriesId),
			FOREIGN KEY(usrstoriesId) REFERENCES usrstories(usrstoriesId)
        )";

if($conn -> query($sqltbl7)){
    echo "tbl tasks created<br>";
}else{
    echo "tbl tasks failed to create<br>";
}

$sqltbl8 = "CREATE TABLE backlog(
            uid int NOT NULL,
            projectKey varchar(255) NOT NULL,
			sprintId int NOT NULL,
			usrstoriesId int NOT NULL,
            PRIMARY KEY(uid,projectKey,sprintId,usrstoriesId),
            FOREIGN KEY(uid) REFERENCES userproject(uid),
            FOREIGN KEY(projectKey) REFERENCES userproject(projectKey),
			FOREIGN KEY(sprintId) REFERENCES sprint(sprintId),
			FOREIGN KEY(usrstoriesId) REFERENCES usrstories(usrstoriesId)
        )";

if($conn -> query($sqltbl8)){
    echo "tbl backlog created<br>";
}else{
    echo "tbl backlog failed to create<br>";
}


$conn->close();
?>