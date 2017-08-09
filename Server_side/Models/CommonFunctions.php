<?php
include "../config.php";

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
				session_start();
				$data						=	$sth->fetch(PDO::FETCH_ASSOC);
				
				$_SESSION['Name']		=	$data['Name'];
				$_SESSION['Email']		=	$data['Email'];
				$_SESSION['Contact']	=	$data['Contact'];
				$_SESSION['Type']		=	$data['Type'];
				$_SESSION['Id']			=	$data['Id'];
				
				return "1";
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
	
}
?>