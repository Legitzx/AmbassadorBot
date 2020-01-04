<?php
echo '<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';

$username = "root";
$password = "root";
$database = "ambassador";
$mysqli = new mysqli("localhost", $username, $password, $database);
$query = "SELECT * FROM logs WHERE team = 1 AND checked = 1;";


echo '
<div class="w3-container">
	<table  class="w3-table-all">
      <tr class="w3-green">
          <td> <font face="Arial">Name</font> </td>
          <td> <font face="Arial">Team</font> </td>
          <td> <font face="Arial">Grade</font> </td>
          <td> <font face="Arial">ID</font> </td>
          <td> <font face="Arial">Discord ID</font> </td>
          <td> <font face="Arial">Authentication Level</font> </td>
      </tr>';

if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $field1name = $row["name"];
        $field2name = $row["team"];
        $field3name = $row["grade"];
        $field4name = $row["id"];
        $field5name = $row["discordid"];
        $field6name = $row["checked"];

        echo '<tr>
                  <td>'.$field1name.'</td>
                  <td>'.$field2name.'</td>
                  <td>'.$field3name.'</td>
                  <td>'.$field4name.'</td>
                  <td>'.$field5name.'</td>
                  <td>'.$field6name.'</td>
              </tr>
							</div>';

    }

    $result->free();
}

$query = "SELECT * FROM logs WHERE team = 2 AND checked = 1;";


echo '
<div class="w3-container">
	<table  class="w3-table-all">
      <tr class="w3-green">
          <td> <font face="Arial">Name</font> </td>
          <td> <font face="Arial">Team</font> </td>
          <td> <font face="Arial">Grade</font> </td>
          <td> <font face="Arial">ID</font> </td>
          <td> <font face="Arial">Discord ID</font> </td>
          <td> <font face="Arial">Authentication Level</font> </td>
      </tr>';

if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $field1name = $row["name"];
        $field2name = $row["team"];
        $field3name = $row["grade"];
        $field4name = $row["id"];
        $field5name = $row["discordid"];
        $field6name = $row["checked"];

        echo '<tr>
                  <td>'.$field1name.'</td>
                  <td>'.$field2name.'</td>
                  <td>'.$field3name.'</td>
                  <td>'.$field4name.'</td>
                  <td>'.$field5name.'</td>
                  <td>'.$field6name.'</td>
              </tr>
							</div>';
    }

    $result->free();
}

$query = "SELECT * FROM logs WHERE team = 3 AND checked = 1;";


echo '
<div class="w3-container">
	<table  class="w3-table-all">
      <tr class="w3-green">
          <td> <font face="Arial">Name</font> </td>
          <td> <font face="Arial">Team</font> </td>
          <td> <font face="Arial">Grade</font> </td>
          <td> <font face="Arial">ID</font> </td>
          <td> <font face="Arial">Discord ID</font> </td>
          <td> <font face="Arial">Authentication Level</font> </td>
      </tr>';

if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $field1name = $row["name"];
        $field2name = $row["team"];
        $field3name = $row["grade"];
        $field4name = $row["id"];
        $field5name = $row["discordid"];
        $field6name = $row["checked"];

        echo '<tr>
                  <td>'.$field1name.'</td>
                  <td>'.$field2name.'</td>
                  <td>'.$field3name.'</td>
                  <td>'.$field4name.'</td>
                  <td>'.$field5name.'</td>
                  <td>'.$field6name.'</td>
              </tr>
							</div>';
    }

    $result->free();
}

$query = "SELECT * FROM logs WHERE team = 4 AND checked = 1;";


echo '
<div class="w3-container">
	<table  class="w3-table-all">
      <tr class="w3-green">
          <td> <font face="Arial">Name</font> </td>
          <td> <font face="Arial">Team</font> </td>
          <td> <font face="Arial">Grade</font> </td>
          <td> <font face="Arial">ID</font> </td>
          <td> <font face="Arial">Discord ID</font> </td>
          <td> <font face="Arial">Authentication Level</font> </td>
      </tr>';

if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $field1name = $row["name"];
        $field2name = $row["team"];
        $field3name = $row["grade"];
        $field4name = $row["id"];
        $field5name = $row["discordid"];
        $field6name = $row["checked"];

        echo '<tr>
                  <td>'.$field1name.'</td>
                  <td>'.$field2name.'</td>
                  <td>'.$field3name.'</td>
                  <td>'.$field4name.'</td>
                  <td>'.$field5name.'</td>
                  <td>'.$field6name.'</td>
              </tr>
							</div>';
    }

    $result->free();
}
?>
