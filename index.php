<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="description" content="Vault-Js">
	<link rel="icon" href="images/transparent_kon.png">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://fonts.googleapis.com/css?family=ZCOOL+QingKe+HuangYou" rel="stylesheet">
	<script type="text/javascript" src="js/digit.js"></script>
	<title>Vault Js</title>
</head>
<body>
	<div id="counters">
		<div>
			<span>Correct: </span>
			<span id="CorrectCodeCounter">0</span>
		</div>
		<div>
			<span>Incorrect: </span>
			<span  id="IncorrectCodeCounter">0</span>
		</div>
	</div>
	<div id="MessageBox">
		<span id="Message">Eldo kurwy.</span>
	</div>
	<div id="container">
		<div id="lock">
			<div id="Dig_1" onclick="ScrollNum(1)">
				<div id="D_1_N_0" class="digit">1</div>
				<div id="D_1_N_1" class="digit">0</div>
				<div id="D_1_N_2" class="digit">9</div>
			</div>
			<div id="Dig_2" onclick="ScrollNum(2)">
				<div id="D_2_N_0" class="digit">1</div>
				<div id="D_2_N_1" class="digit">0</div>
				<div id="D_2_N_2" class="digit">9</div>
			</div>
			<div id="Dig_3" onclick="ScrollNum(3)">
				<div id="D_3_N_0" class="digit">1</div>
				<div id="D_3_N_1" class="digit">0</div>
				<div id="D_3_N_2" class="digit">9</div>
			</div>
		</div>
		<div id="Submit" onclick="CheckIfGood()">Unlock</div>
	</div>
</body>
</html>