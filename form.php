<?php

$pageTitle = "Form page";
require_once __DIR__ . "/inc/header.php";

if(isset($_POST["submit"])) {
	$firstname = $_POST["firstname"] ?? "";
	$lastname = $_POST["lastname"] ?? "";

	echo "Hello, ${firstname} ${lastname}!";
}

?>

<form action="#" method="post">
	<label>
		<span>Firstname</span>
		<input type="text" name="firstname" required />
	</label>
	<label>
		<span>Lastname</span>
		<input type="text" name="lastname" required />
	</label>
	<button type="submit" name="submit">Submit form</button>
</form>

<?php

require_once __DIR__ . "/inc/footer.php";