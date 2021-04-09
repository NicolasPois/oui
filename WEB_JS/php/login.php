<?php
session_start();

$obj = new stdClass();
$obj->result = true;

if(isset($_POST['username']) && isset($_POST['password'])){
  $username = $_POST['username'];
  $password = $_POST['password'];
  if($username == "test" && $password == "test"){
    $obj->message = "Welcome!";
    //faking found user_id=1
    $_SESSION["user_id"] = 1;
  } else {
    $obj->result = false;
    $obj->message = 'username and password invalid!';
  }
} else {
  $obj->result = false;
  $obj->message = 'username and password required!';
}

//final output
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo json_encode($obj);
