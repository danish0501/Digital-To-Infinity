<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'mail_config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

try {
    $mail = getMailer();
    $mail->addAddress('contact@digitaltoinfinity.com');

    $mail->isHTML(true);
    $mail->Subject = "New Lead: " . $inputData['name'];

    $categoryDisplay = $inputData['category'];
    if ($categoryDisplay === 'Other' && !empty($inputData['customCategory'])) {
        $categoryDisplay = "Other (" . $inputData['customCategory'] . ")";
    }

    $bodyContent = "<h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> {$inputData['name']}</p>
                    <p><strong>Phone:</strong> {$inputData['phone']}</p>
                    <p><strong>Email:</strong> " . ($inputData['email'] ?: 'Not provided') . "</p>
                    <p><strong>Company:</strong> " . ($inputData['company'] ?: 'Not provided') . "</p>
                    <p><strong>Category:</strong> " . ($categoryDisplay ?: 'Not provided') . "</p>
                    <p><strong>Message:</strong><br>" . nl2br($inputData['message'] ?: 'No message provided') . "</p>";

    $mail->Body = $bodyContent;
    $mail->send();

    echo json_encode(["status" => "success", "message" => "Message sent successfully"]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
}
?>