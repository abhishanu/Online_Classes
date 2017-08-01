<?php
 	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers:Origin,X-Requested,Content-Type");
	
	$uname=$_POST['uname'];
	$email=$_POST['email'];
	$phone=$_POST['phone'];
	$pwd=$_POST['pwd'];
	
	$t=time();
	$random=rand(10,100);
	
	$Id=$t;
	
	$servername="localhost";
	$username="root";
	$password="";
	$dbname="online_tutorial";
	$conn=new mysqli($servername,$username,$password,$dbname);
	$sql="INSERT INTO signup_details(`Id`, `Name`, `Email`, `Pwd`, `Contact`) VALUES ('$Id','$uname','$email','$pwd','$phone')";
	
	if(true){
		$result=$conn->query($sql);
		if($result == true){
			$data="success";
		}
		else{
			$data="failure";
		}
	}
	
	echo json_encode($data);
	$conn->close();
?>
