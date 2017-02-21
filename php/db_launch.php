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
			sprintStatus varchar(255),
            sprintGoal text NOT NULL,
			sprintStartDate varchar(255),
			sprintEndDate varchar(255),
			projectKey varchar(255) NOT NULL,
			PRIMARY KEY(sprintId),
			FOREIGN KEY (projectKey) REFERENCES project(projectKey)
        )";

if($conn -> query($sqltbl5)){
    echo "tbl sprint created <br>";
}else{
    echo "tbl sprint failed to create <br>";
}

$sqltbl8 = "CREATE TABLE backlog(
            backlogId int NOT NULL AUTO_INCREMENT,
			backlogType varchar(255) NOT NULL,
			backlogTitle TEXT,
			backlogPriority varchar(255) NOT NULL,
			backlogStoryPoint int,
			backlogDesc TEXT,
			date_created varchar(255) NOT NULL,
			date_modified varchar(255) NOT NULL,
			backlogCreator varchar(255) NOT NULL,
			backlogStatus varchar(255) NOT NULL,
			sprintId int,
            PRIMARY KEY(backlogId)
        )";

if($conn -> query($sqltbl8)){
    echo "tbl backlog created<br>";
}else{
    echo "tbl backlog failed to create<br>";
}

$sqltbl9 = "CREATE TABLE upb(
			uid int NOT NULL,
			projectKey varchar(255) NOT NULL,
			backlogId int NOT NULL,
			PRIMARY KEY(uid, projectKey, backlogId),
			FOREIGN KEY(uid) REFERENCES user(uid),
			FOREIGN KEY(projectKey) REFERENCES project(projectKey),
			FOREIGN KEY(backlogId) REFERENCES backlog(backlogId)
			
			)";
			
if($conn -> query($sqltbl9)){
    echo "tbl ubp created<br>";
}else{
    echo "tbl ubp failed to create<br>";
}

$sqltbl10 = "create table backlogComment(
			backlogCommentId int not null AUTO_INCREMENT,
			backlogComment text,
			date_comment varchar(255),
			email varchar(255) not null,
			backlogId int not null,
			PRIMARY KEY (backlogCommentId),
			FOREIGN KEY(backlogId) REFERENCES backlog(backlogId)
			)";
			
if($conn -> query($sqltbl10)){
    echo "tbl comment created<br>";
}else{
    echo "tbl comment failed to create<br>";
}

$sqltbl7 = "CREATE TABLE tasks(
            tasksId int NOT NULL AUTO_INCREMENT,
			tasksTitle text NOT NULL,
			tasksDescription text NOT NULL,
			tasksStatus varchar(255) NOT NULL,
			date_created varchar(255),
			date_modified varchar(255),
			backlogId int,
			PRIMARY KEY(tasksId,backlogId),
			FOREIGN KEY(backlogId) REFERENCES backlog(backlogId)
        )";

if($conn -> query($sqltbl7)){
    echo "tbl tasks created<br>";
}else{
    echo "tbl tasks failed to create<br>";
}

$sqltbl12 = "create table taskComment(
			taskCommentId int not null AUTO_INCREMENT,
			taskComment text,
			date_comment varchar(255),
			email varchar(255) not null,
			tasksId int not null,
			PRIMARY KEY (taskCommentId, tasksId),
			FOREIGN KEY(tasksId) REFERENCES tasks(tasksId)
			)";
			
if($conn -> query($sqltbl12)){
    echo "tbl tasks comment created<br>";
}else{
    echo "tbl tasks comment failed to create<br>";
}

$conn->close();
?>