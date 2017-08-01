<?php
$funcCall	=	isset($_GET['action']) ? $_GET['action'] : '';
if($funcCall == '')
{
	return;
}
else
{
	include "../Models/CommonFunctions.php";
	$CommonFunctions = new CommonFunctions();
	
	switch ($funcCall) 
	{
		case 'signIn':
		
			$email		=	isset($_POST['email']) ? $_POST['email'] : '';
			$pwd 		=	isset($_POST['pwd']) ? $_POST['pwd'] : '';
	
			$res = $CommonFunctions->loginUser($email, md5($pwd));
			echo $res;
			
		break;
			
	}
			
}