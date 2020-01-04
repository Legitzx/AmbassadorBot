<?php

ini_set('display_errors', 1);

$name = filter_input(INPUT_POST, 'name');
$team = filter_input(INPUT_POST, 'team');
$grade = filter_input(INPUT_POST, 'grade');
$id = filter_input(INPUT_POST, 'id');
$discordid = filter_input(INPUT_POST, 'discordid');
$checked = 0;
$exists = 5;

$host = "localhost";
$dbusername = "root";
$dbpassword = "root";
$dbname = "ambassador";

if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
  exit("Name should only contain letters!");
}

$conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if (mysqli_connect_error()){
  die('Connect Error ('. mysqli_connect_errno() .') '
  . mysqli_connect_error());
} else{
  $exist = "SELECT * FROM logs WHERE discordid = '$discordid'";
  $res = mysqli_query($conn, $exist);
  $num_rows = mysqli_num_rows($res);

  if($num_rows > 0) {
    echo "User with the same Discord ID already exists! Failed to submit.";
    $conn->close();
  } else {
    $sql = "INSERT INTO logs (name, team, grade, id, discordid, checked)
    values ('$name', '$team', '$grade', '$id', '$discordid', '$checked')";
    if ($conn->query($sql)){
      echo "Sucessfully Submitted!";
    } else{
      echo "Error: ". $sql ."
      ". $conn->error;
    }
    $conn->close();
  }
}


?>
