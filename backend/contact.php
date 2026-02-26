<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'mail_config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);
if (empty($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$email = isset($data['email']) ? strip_tags(trim($data['email'])) : '';
$phone = isset($data['phone']) ? strip_tags(trim($data['phone'])) : '';
$company = isset($data['company']) ? strip_tags(trim($data['company'])) : '';
$category = isset($data['category']) ? strip_tags(trim($data['category'])) : '';
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name and Mobile number are required."]);
    exit;
}

$subject = "New Lead: " . ($company ? "Inquiry from $company" : "New Website Lead") . " - " . $name;
$emailBody = "
<html>
<body>
    <h2>New Lead Received</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Company:</strong> $company</p>
    <p><strong>Category:</strong> $category</p>
    <p><strong>Message:</strong><br/>" . nl2br($message) . "</p>
</body>
</html>
";

try {
    $mail = getMailer();
    $mail->addAddress("contact@digitaltoinfinity.com");
    $mail->addAddress("digitaltoinfinity360@gmail.com");
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $emailBody;
    $mail->send();

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Details sent successfully."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email.", "debug" => $mail->ErrorInfo]);
}
?>