<?php
ob_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'mail_config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$inputData = json_decode(file_get_contents('php://input'), true);

if (!$inputData || !isset($inputData['name']) || !isset($inputData['phone'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Required fields missing."]);
    exit;
}

try {
    $mail = getMailer();
    $mail->addAddress("contact@digitaltoinfinity.com");

    $mail->Subject = "New Popup Inquiry: " . $inputData['name'];
    $mail->isHTML(true);

    $body = "<h2>Popup Inquiry</h2>
             <p><strong>Name:</strong> {$inputData['name']}</p>
             <p><strong>Phone:</strong> {$inputData['phone']}</p>
             <p><strong>Company:</strong> " . ($inputData['company'] ?? 'N/A') . "</p>
             <p><strong>Category:</strong> " . ($inputData['finalCategory'] ?? 'N/A') . "</p>
             <p><strong>Email:</strong> " . ($inputData['email'] ?? 'N/A') . "</p>
             <p><strong>Message:</strong><br>" . nl2br($inputData['message'] ?? 'N/A') . "</p>";

    $mail->Body = $body;
    $mail->send();

    echo json_encode(["status" => "success", "message" => "Popup inquiry sent successfully."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email.", "debug" => $mail->ErrorInfo]);
}
ob_end_flush();
?>