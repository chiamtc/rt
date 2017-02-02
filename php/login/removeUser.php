<?php
	setcookie("uid", "", time()-(86400 * 30), "/");
	setcookie("email","", time()-(86400 *30), "/");
	echo json_encode(0);
?>