<?php
  session_start();

  $obj = new stdClass();
  $obj->result = true;

  if(isset($_SESSION["user_id"])){
    $is_connected = true;
  } else {
    $is_connected = false;
  }
  $obj->is_connected = $is_connected;

  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  header('Content-type: application/json');
  echo json_encode($obj);
