<?php
$host = "localhost:C:\base.fdb"; 
$username=""; 
$password=""; 
$dbh = ibase_connect($host, $username, $password); 
$stmt = "SELECT * FROM users"; 
$result = ibase_query($dbh, $stmt); 
if ($result==0) 
   echo("<B>Ошибка!</B>"); 

?>
