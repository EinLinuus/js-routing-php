<?php
require_once __DIR__ . "/core.php";

if(!isset($pageTitle)) $pageTitle = "Document";

if($isJSrequest) header("X-Page-Title: " . $pageTitle);
?>

<?php if(!$isJSrequest) { ?>
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?= $pageTitle ?></title>
		<link rel="stylesheet" href="assets/style.css">
		<script src="assets/script.js" defer></script>
	</head>
	<body>
<?php } ?>
	<header>
		<a href="index.php" title="Home">Home</a>
		<a href="about.php" title="About">About</a>
		<a href="form.php" title="Form">Form</a>
	</header>
	<main>