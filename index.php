<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>

	<link rel="stylesheet" href="style/style.css">

	<script src="./app.js"></script>

	<!-- <title>TGS Rowing Club Crew Creator</title> -->
</head>

<body>
	<header>
		<div class="left">
			Takapuna Grammar School Crew Creator
		</div>
		<div class="right">
			<ul>
				<li>
					<a href="/#/member-editor">
						<p>Member Editor</p>
					</a>
				</li>
				<li>
					<a href="/#/crew-editor">
						<p>Crew Editor</p>
					</a>
				</li>
				<li>
					<a href="/#/crew-display">
						<p>Crew Display</p>
					</a>
				</li>
			</ul>
		</div>
	</header>
	<main>
		<div class="page member-editor">
			<?php include "./pages/member-editor.php" ?>
		</div>
		<div class="page crew-editor hidden">
			<?php include "./pages/crew-editor.php" ?>
		</div>
		<div class="page crew-display hidden">
			<?php include "./pages/crew-display.php" ?>
		</div>
	</main>

</body>

</html>