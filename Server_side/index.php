<?php
 	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers:Origin,X-Requested,Content-Type");
	$data = json_decode(file_get_contents('php://input'));
	
	$servername="localhost";
	$username="root";
	$password="";
	$dbname="online_tutorial";
	$conn=new mysqli($servername,$username,$password,$dbname);
	$sql="INSERT INTO login_details(`Id`, `Password`, `Type`) VALUES ('108','ak','admin')";
	
	if(true){
		$qry=$conn->query($sql);
	}
	
	$conn->close();
?>