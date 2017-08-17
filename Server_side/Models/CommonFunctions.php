<?php
include "../config.php";

require $_SERVER['DOCUMENT_ROOT'].'/OnlineTutorial/mailgun/mailgun-php/vendor/autoload.php';
use Mailgun\Mailgun;

class CommonFunctions 
{

    private $dbh;

    public function __construct() 
	{
        $this->dbh = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
		
		$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }
	
	function loginUser($email, $pwd)
	{
		try 
		{
            $sth = $this->dbh->prepare("SELECT Id, Name, Email, Contact, Type FROM signup_details WHERE Email = :Email and Pwd = :Pwd ");
            $sth->execute( array('Email'=> $email, 'Pwd'=> $pwd) );
			
			if($sth->rowCount())
			{
				return	$sth->fetch(PDO::FETCH_ASSOC);
			}
			else
			{
				return "-1";
			}
			
        } 
		catch (PDOException $e) 
		{
            return $e->getMessage();
        }
	}
	
	function getEditProfileInfo()
	{
		try
		{
			$query	=	$this->dbh->prepare("SELECT * FROM student_details WHERE Id=1");
			
			$query->execute();
			
			// for more than one records used fetchAll
			// for single row data use fetch
			$resData	=	$query->fetch(PDO::FETCH_ASSOC);
			
			return $resData;
		}
		catch(PDOException $e)
		{
			return $e->getMessage();
		}
	}
	
	function saveStudentProfile($name, $email, $contact, $id)
	{
		try 
		{
			$alreadyExist	=	$this->dbh->prepare("SELECT Email FROM signup_details WHERE Email= :Email AND Id != :Id");
			
			$alreadyExist->execute( array( 'Email'=> $email, 'Id'=> $id ) );
			
			
			if($alreadyExist->rowCount())
			{
				return "-2";
			}
			
			$query	=	" UPDATE signup_details SET Name = :Name, Email=:Email, Contact=:Contact WHERE Id=:Id";
		
			$saveStudent = $this->dbh->prepare($query);
			
			$saveStudent->execute( 
				array
				(
					'Name'=> $name, 
					'Email'=> $email, 
					'Contact'=> $contact,
					'Id'=> $id
				) 
			);
				
			if($saveStudent->rowCount())
			{
				return "1";
			}
			else
			{
				return "-3";
			}
        } 
		catch (PDOException $e) 
		{
            return $e->getMessage();
        }
	}
	
	function signUp($name, $email, $contact, $pwd, $type)
	{
		try 
		{
			$alreadyExist	=	$this->dbh->prepare("SELECT Email,Contact FROM signup_details WHERE Email= :Email OR Contact= :Contact");
			
			$alreadyExist->execute( array( 'Email'=> $email, 'Contact'=> $contact ) );
			
			
			if($alreadyExist->rowCount())
			{
				return "-3";
			}
			
			$query	=	" INSERT INTO signup_details (Name,Email,Contact,Pwd,Type,CreatedDate) VALUES ( :Name, :Email, :Contact, :Pwd, :Type, NOW() ) ";
		
			$saveStudent = $this->dbh->prepare($query);
			
			$saveStudent->execute( 
				array
				(
					'Name'=> ucwords($name), 
					'Email'=> $email, 
					'Contact'=> $contact,
					'Pwd'=> $pwd,
					'Type'=> $type,
				) 
			);
				
			if($saveStudent->rowCount())
			{
				return "1";
			}
			else
			{
				return "-4";
			}
        } 
		catch (PDOException $e) 
		{
            return $e->getMessage();
        }
	}
	
	/**
	  * @Function: mailExist()
	  * @Description: Function is check whether email exist or not and if exist then update user activation key
	  * @return: Boolean
	  * @date: 12/08/2017
	  * @lastModified: 
	  * 
	*/
	function mailExist($email, $activationKey)
	{
		try 
		{
			// query to check email exist or not
			$Exist	=	$this->dbh->prepare("SELECT Email FROM signup_details WHERE Email= :Email");
			
			$Exist->execute( array( 'Email'=> $email ) );
			
			// execute condition when mail exist
			if($Exist->rowCount())
			{
				// query to update user activation key
				$updateKey	=	$this->dbh->prepare("UPDATE signup_details SET ActivationKey=:ActivationKey, KeyUpdateTime = NOW() WHERE Email= :Email");
			
				$updateKey->execute( array( 'Email'=> $email, 'ActivationKey'=> $activationKey ) );
				
				// execute condition when update query runs successfully
				if($updateKey->rowCount())
				{
					return 1;
				}	
			}
			else
			{
				return -2;
			}
		}
		catch (PDOException $e) 
		{
            return $e->getMessage();
        }
	}
	
	/**
	  * @Function: resetPassword()
	  * @Description: Function is used to reset user password
	  * @return: Boolean
	  * @developer: Shantanu | 7shantanusharma@gmail.com
	  * @date: 12/08/2017
	  * @lastModified: 
	  * 
	*/
	function resetPassword($email, $password, $activationKey)
	{
		try 
		{
			// query to update user password
			$updatePassword	=	$this->dbh->prepare(" UPDATE signup_details SET Password = :Password, UpdatedDate = NOW() WHERE Email = :Email AND ActivationKey = :ActivationKey ");
		
			$updatePassword->execute
			(
				array( 'Email'=> $email, 'Password' =>  $password, 'ActivationKey'=> $activationKey) 
			);
			
			// execute condition when update query runs successfully
			if($updatePassword->rowCount())
			{
				// query to update activation key to null so next time user will not be able to use it
				$query	=	$this->dbh->prepare(" UPDATE signup_details SET ActivationKey = :blank, KeyUpdateTime = NOW() WHERE Email = :Email ");
				
				$blank	=	null;
		
				$query->execute( array( 'blank'=> $blank, 'Email'=> $email) );
				
				if($query->rowCount())
				{
					return 1;
				}
			}				
			else
			{
				return -3;
			}
		}
		catch (PDOException $e) 
		{
            return $e->getMessage();
        }
	}
	
	/**
	  * @Function: send_mail()
	  * @Description: Function is used to send mail via mail-gun API
	  * @return: JSON
	  * @developer: Shantanu | 7shantanusharma@gmail.com
	  * @date: 12/08/2017
	  * @lastModified: 
	  * 
	*/
	public function send_mail($to,$subject,$msg,$from) 
	{
		define('MAILGUN_URL', 'https://api.mailgun.net/v3/sandboxd1237cddd6184c05bd397275cfbeb229.mailgun.org');
		define('MAILGUN_KEY', 'key-2ef28c949b2d31ea66c0f89b1c090109'); 

		//trigger exception in a "try" block
		try 
		{
			$mailfromname="Online Tutorial";
			$toname="shan";
			/*$mgClient = new Mailgun('key-2ef28c949b2d31ea66c0f89b1c090109');
			$domain = "	sandboxd1237cddd6184c05bd397275cfbeb229.mailgun.org";*/
			
			$array_data = array(
				'from'=> $mailfromname .'<'.$from.'>',
				'to'=>$toname.'<'.$to.'>',
				'subject'=>$subject,
				'html'=>$msg,
				'o:tracking'=>'yes',
				'o:tracking-clicks'=>'yes',
				'o:tracking-opens'=>'yes'
			);
			
			$session = curl_init(MAILGUN_URL.'/messages');
			curl_setopt($session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($session, CURLOPT_USERPWD, 'api:'.MAILGUN_KEY);
			curl_setopt($session, CURLOPT_POST, true);
			curl_setopt($session, CURLOPT_POSTFIELDS, $array_data);
			curl_setopt($session, CURLOPT_HEADER, false);
			curl_setopt($session, CURLOPT_ENCODING, 'UTF-8');
			curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
			$response = curl_exec($session);
			curl_close($session);
			$results = json_decode($response, true);
			//print_r($results);
			return $results;
			
		}

		//catch exception
		catch(Exception $e) 
		{		
			$errMsg = $e->getMessage();
			return send_php_mail($errMsg, $from);		
		}
	}
	
}
?>