<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested,Content-Type");

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
			echo json_encode($res);
			
		break;
		
		case 'getEditProfileInfo':
		
			$res = $CommonFunctions->getEditProfileInfo();
			// here json string without index for single row data which is also called json object
			echo json_encode($res);
			
			break;
			
		case 'saveStudentProfile':
		
			$name		=	isset($_POST['nameInput']) ? $_POST['nameInput'] : '';
			$email 		=	isset($_POST['emailInput']) ? $_POST['emailInput'] : '';
			$contact 	=	isset($_POST['contactInput']) ? $_POST['contactInput'] : '';
			$id 		=	isset($_POST['id']) ? $_POST['id'] : '';
			
			if($name != "" && $email != "" && $contact != "" && $id != "")
			{
				$res = $CommonFunctions->saveStudentProfile($name, $email, $contact, $id);
				//echo json_encode($res);
			}
			else
			{
				echo json_encode(-1);	// -1 flag is for blank fields
			}
	
		case 'signUp':
		
			$name		=	isset($_POST['name']) ? $_POST['name'] : '';
			$email		=	isset($_POST['email']) ? $_POST['email'] : '';
			$contact 	=	isset($_POST['contact']) ? $_POST['contact'] : '';
			$pwd 		=	isset($_POST['pwd']) ? $_POST['pwd'] : '';
			$confirm 	=	isset($_POST['confirm']) ? $_POST['confirm'] : '';
			$type 		=	isset($_POST['type']) ? $_POST['type'] : '';
			
			if($name == '' || $email == '' || $contact == '' || $pwd == '' || $confirm == '' || $type == '')
			{
				echo json_encode(-1);
				return;
			}
			
			if($pwd != $confirm)
			{
				echo json_encode(-2);
				return;
			}
	
			$res = $CommonFunctions->signUp($name, $email, $contact, md5($pwd), $type);
			echo json_encode($res);
			
		break;	
		
		case 'searchSuggestion':
			$array	=	array('php','jquery','ajax','angular','bootstarp');
			echo json_encode($array);
		break;
		
		case 'forgotPassword':
		
			$email		=	isset($_POST['email']) ? $_POST['email'] : '';
			
			if( $email != '')
			{
				//$email		=	"koimailnhi@gmail.com";
				$activationKey	= 	sha1(mt_rand(10000,99999).time().$email);
				
				// mailExist function will check that requested email exist or not 
				// If exist then update that user activation key 
				// otherwise show error message with -2 flag
				
				$response	=	$CommonFunctions->mailExist($email, $activationKey);
				
				if($response > 0)
				{
					$subject		=	"Reset Password Link";
					$from			=	"notices@onlinetutorial.com";
				
					$msg = '<html>
						<body style="font-family:sans-serif">
							<div style="border:1px solid #333;padding:20px;width:800px;margin:0 auto;">
								<div style="width:100%;">
									<h2 style="border-bottom:1px solid #333;text-align:center;">Reset Password Link</h2>
								</div>
								<div style="width:100%;margin-bottom: 25px;">
									<p>
										It looks like you requested a new password. Please use the following link to setup a new password..<br/>
									</p>
									<div style="text-align:center;font-weight:bold;">
										<a href="http://localhost:4200?key='.$activationKey.'&eml='.base64_encode($email).'">Click Here to Setup new password
										</a>
									</div>
									<br/><br/>
									<p>
										Thanks<br/>
									</p>
								</div>
							</div>
						</body>
					</html>';
					
					// send_mail is common function for send mail via mail-gun API
					$result		=	$CommonFunctions->send_mail($email,$subject,$msg,$from);
				
					// send_mail function will return id when mail send successfully
					if(isset($result['id']))
					{
						// flag 1 is for success message
						echo json_encode(1);
					}
				}
				// -2 flag is for mail not exist error message
				else
				{
					echo json_encode(-2);
				}
			}
			// -1 flag is for blank field error message
			else
			{
				echo json_encode(-1);
			}
			
		break;
		
		case 'resetPassword':
		
			$email		=	isset($_POST['emailInput']) ? base64_decode($_POST['emailInput']) : '';
			$password	=	isset($_POST['newPassword']) ? $_POST['newPassword'] : '';
			$confirm 	=	isset($_POST['confirmPassword']) ? $_POST['confirmPassword'] : '';
			$key 		=	isset($_POST['activationKeyInput']) ? $_POST['activationKeyInput'] : '';
			
			if($email == '' || $password == '' || $confirm == '' || $key == '')
			{
				echo json_encode(-1);
				return;
			}
			
			if($password != $confirm)
			{
				echo json_encode(-2);
				return;
			}
	
			$res = $CommonFunctions->resetPassword($email, md5($password), $key);
			echo json_encode($res);
			
		break;
	}
			
}