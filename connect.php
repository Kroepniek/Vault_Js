<?php
	$host = "localhost";
	$db_username = "root";
	$db_password = "root";
	$db_name = "vaultjs";

	$code = "123";

	$con = @new mysqli($host, $db_username, $db_password, $db_name);
	
	if ($con->connect_errno!=0)
	{
		echo "error";
	}
	else
	{
		if ($result = @$con->query("SELECT * FROM Codes WHERE ID = 1"))
		{
			$record = $result->fetch_assoc();
			$code = $record['Code'];
			$result->free_result();
		}
	}

	echo $code;
?>