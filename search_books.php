<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sabatia_library";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = $conn->real_escape_string($_GET['query']);
$sql = "SELECT * FROM books WHERE title LIKE '%$query%' OR author LIKE '%$query%'";
$result = $conn->query($sql);

$books = [];
while($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode($books);

$conn->close();
?>
