<?php

/**
 * Common function for sending mail by mailgun api.
 */

require $_SERVER['DOCUMENT_ROOT'].'/mileage/mailgun/mailgun-php/vendor/autoload.php';
use Mailgun\Mailgun;

function sendMail($toName, $subject, $message, $from=null,$filename='') 
{
	
	if ($from==null) 
	{		
		$from = 'From: J & S ANAND <notices@jandsdev.com>';
	} 
	
	//trigger exception in a "try" block
	try 
	{
		$mgClient = new Mailgun('key-edc613a90c158473e0991fd6dfebea32');
		$domain = "jandsdev.com"; 
		//$domain = "sandboxd1237cddd6184c05bd397275cfbeb229.mailgun.org";
		
		if($filename!="") {
			//$path=DIRECTORYPATH."uploads/temp/".$loginId."/attachFile/";
			$files['attachment'][] = $filename;
		} else {
			$files = array();
		}
		# Make the call to the client.
		$result = $mgClient->sendMessage(
			$domain, 
			array
			(
				'from'				=> $from,
				'to'				=> $toName,
				'subject'			=> $subject,
				'html'				=> $message
			), $files
		);
		
		if($result)
		{			
			return 1;

		} else 
		{			
			return 0;			
		}
		
	}

	//catch exception
	catch(Exception $e) 
	{		
		$errMsg = $e->getMessage();
		return send_php_mail($errMsg, $from);		
	}
}
/*function sendMail($toName, $subject, $message, $from=null, $ccId=null, $filename="", $loginId="") {
	
	if ($from==null) 
	{		
		$from = 'From: J & S ANAND <notices@jandsdev.com>';
	} 
	
	if($filename!="") {
		//$path=DIRECTORYPATH."uploads/temp/".$loginId."/attachFile/";
		$files['attachment'][] = $filename;
	} else {
		$files = array();
	}
	try 
	{
		//Live Credentials
		$mgClient = new Mailgun('key-edc613a90c158473e0991fd6dfebea32');
		$domain = "jandsdev.com";	
		# Make the call to the client.
		//$result = $mgClient->sendMessage("$domain", array('from'    => $from, 'to'      => $toName, 'subject' => $subject, 'html' => $message, 'o:tracking' => 'yes', 'o:tracking-clicks' => 'yes', 'o:tracking-opens' => 'yes'), $files);
		
		# Make the call to the client.
		$result = $mgClient->sendMessage(
			$domain, 
			array
			(
				'from'				=> $from,
				'to'				=> $toName,
				'subject'			=> $subject,
				'html'				=> $message
			)
		);		
		if($result){
			return 1;
		} else {
			return 0;
		}
	}
	catch(Exception $e) 
	{		
		$errMsg = $e->getMessage();
		return send_php_mail($errMsg, $from);		
	}
}*/

/**
 * Notify system administrator(s) when mails cannot be sent using the mailgun API.
 */
function send_php_mail($errMsg, $from) 
{
	
	$to = '7shantanusharma@gmail.com';	 
	$subject = 'J & S ANAND: Email not delivered';
	$headers = "From: notices@jandsdev.com \r\n";	
	$headers .= "Reply-To: notices@jandsdev.com \r\n";	
	//$headers .= "CC: notices@jandsdev.com\r\n";	
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	$message = "<html>
					<body>
						<table>
							<tr><td>&nbsp;</td></tr>
							<tr><td>An email was not delivered, here is the basic information:<br></td></tr>
							<tr><td>{$errMsg}</td></tr>
							<tr><td>&nbsp;</td></tr>
						</table>
					</body>
				</html>
				";
	if(mail($to, $subject, $message, $headers))
	{			
		return 1;

	} else 
	{			
		return 0;			
	}
}