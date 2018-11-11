<?php 

$servername = "localhost";
$username = "root"
$password = "password"
//$sql = _GET['sql'];
$sql = "CREATE DATABASE geoCore"

//Create Connection
$conn = new mysqli($servername, $username, $password);

//Check Connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connection Success!";

//Run SQL
if(mysqli_query($conn, $sql)) {
    echo "SQL Sentence Running Complete."
} else {
    echo "Error SQL: " . mysqli_error($conn);
}

//Close Database Connection
mysqli_close($conn);

?>