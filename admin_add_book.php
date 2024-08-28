<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "elibrary";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Generate a random 4-digit book_id
$book_id = rand(1000, 9999);

$title = $conn->real_escape_string($_POST['title']);
$author = $conn->real_escape_string($_POST['author']);
$category_id = intval($_POST['category_id']);
$year = intval($_POST['year']);
$publisher = $conn->real_escape_string($_POST['publisher']);
$version = $conn->real_escape_string($_POST['version']);

// Handle file upload
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["pdf"]["name"]);
$pdf_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Allow only PDF files
if($pdf_file_type != "pdf") {
    die("Sorry, only PDF files are allowed.");
}

if (move_uploaded_file($_FILES["pdf"]["tmp_name"], $target_file)) {
    $pdf_link = $conn->real_escape_string($target_file);

    $sql = "INSERT INTO books (book_id, title, author, category_id, year, publisher, pdf_link) 
            VALUES ($book_id, '$title', '$author', $category_id, $year, '$publisher', '$pdf_link')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Sorry, there was an error uploading your file.";
}

$conn->close();
?>

