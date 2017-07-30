<?php
 	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers:Origin,X-Requested,Content-Type");
	//$json = file_get_contents('php://input');
	
	$email=$_POST['email'];
	$pwd=$_POST['pwd'];
	$servername="localhost";
	$username="root";
	$password="";
	$dbname="online_tutorial";
	$conn=new mysqli($servername,$username,$password,$dbname);
	$sql="SELECT * FROM signup_details WHERE Email='$email' AND Pwd='$pwd'";
	
	$result=$conn->query($sql);
	if($result->num_rows>0){
		$data = 'OK';
	}
	else{
		$data = 'Error';
	}
	
 
	echo json_encode($data);
	$conn->close();
	
?>