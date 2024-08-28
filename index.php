<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "elibrary";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM books";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eLibrary - Sabatia Eye Hospital</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="library-container">
        <h2>eLibrary</h2>
        <div class="shelf">
            <h3>Books</h3>
            <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<div class='book'>";
                    echo "<p>" . $row['title'] . "</p>";
                    echo "<p>Author: " . $row['author'] . "</p>";
                    echo "<p>Year: " . $row['year'] . "</p>";
                    echo "<p>Publisher: " . $row['publisher'] . "</p>";
                    echo "<p>Version: " . $row['version'] . "</p>";
                    echo "<button onclick=\"requestBook('" . $row['title'] . "')\">Request Hard Copy</button>";
                    echo "<button onclick=\"accessPDF('" . $row['pdf_link'] . "')\">Access PDF</button>";
                    echo "</div>";
                }
            } else {
                echo "No books available.";
            }
            $conn->close();
            ?>
        </div>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
