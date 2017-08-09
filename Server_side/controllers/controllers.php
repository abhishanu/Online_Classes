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
		
		case 'getEditProfileInfo':
		
			$res = $CommonFunctions->getEditProfileInfo();
			// here json string without index for single row data which is also called json object
			echo json_encode($res);
			
			break;
			
	}
			
}