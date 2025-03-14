<?php
// konesi ke database
$host = 'localhos';
$user = 'root';
$password = '';
$dbname = 'database keren';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die('koneksi gagal: ' . $conn->connect_error);
}

// ambil data dari database
$sql = "SELECT id, nama, deskripsi FROM tabel_keren";
$result = $conn-query($sql);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Keren</title>
    <style>
        body {
            font-family: Arial, san-serif;
            background-color: #f4f4f9;
            color: #333;
            padding: 20px
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0,1);
        }
        .item {
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }
        .item:last-child {
            border-bottom: none;

        }
        h1 {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>daftar keren</h1>
        <?php if ($result->num_row > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="item">
                <h3><?= htmlspecialchars($row['nama']) ?></h3>
                <p><?= htmlspecialchars($row['deskripsi']) ?>:</p>
                </div>
            <?php endwhile; ?>
        <?php  else: ?>
            <p>tidak ada data yang tersedia.</p>
        <?php endif; ?>
    </div>
</body>
</html>

<?php
$conn->close();
?>