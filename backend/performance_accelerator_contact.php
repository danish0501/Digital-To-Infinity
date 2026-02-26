<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

error_reporting(0);
ini_set('display_errors', 0);

require_once 'mail_config.php';

$inputData = json_decode(file_get_contents('php://input'), true);

if (!$inputData || !isset($inputData['name']) || !isset($inputData['phone'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Required fields missing."]);
    exit;
}

try {
    $mail = getMailer();
    $mail->addAddress("contact@digitaltoinfinity.com");

    $mail->Subject = "New Enquiry: Performance Accelerator Landing Page";
    $mail->isHTML(true);

    $body = "<h2>Application: Performance Accelerator Package</h2>
             <p><strong>Name:</strong> " . htmlspecialchars($inputData['name']) . "</p>
             <p><strong>Mobile Number:</strong> " . htmlspecialchars($inputData['phone']) . "</p>
             <p><strong>Email:</strong> " . htmlspecialchars($inputData['email'] ?? 'N/A') . "</p>
             <p><strong>Business Type:</strong> " . htmlspecialchars($inputData['businessType'] ?? 'N/A') . "</p>
             <p><strong>Monthly Marketing Spend:</strong> " . htmlspecialchars($inputData['marketingSpend'] ?? 'N/A') . "</p>
             <p><strong>Decision Maker:</strong> " . htmlspecialchars($inputData['isDecisionMaker'] ?? 'N/A') . "</p>";

    $mail->Body = $body;
    $mail->send();

    echo json_encode(["status" => "success", "message" => "Application sent successfully."]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send application.", "debug" => $e->getMessage()]);
}
