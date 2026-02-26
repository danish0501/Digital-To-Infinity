<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'mail_config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
    exit;
}

$jobTitle = isset($_POST['jobTitle']) ? strip_tags(trim($_POST['jobTitle'])) : 'Unknown Role';
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
$mobile = isset($_POST['mobile']) ? strip_tags(trim($_POST['mobile'])) : '';
$link = isset($_POST['link']) ? strip_tags(trim($_POST['link'])) : '';

if (empty($name) || empty($email) || empty($mobile)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, Email, and Mobile are required."]);
    exit;
}

$attachments = [];
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['resume']['tmp_name'];
    $fileName = time() . '_' . basename($_FILES['resume']['name']);
    $destPath = $uploadDir . $fileName;
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        $attachments[] = ['path' => $destPath, 'name' => $fileName];
    }
}

if (isset($_FILES['audio']) && $_FILES['audio']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['audio']['tmp_name'];
    $fileName = 'audio_' . time() . '.wav';
    $destPath = $uploadDir . $fileName;
    if (move_uploaded_file($fileTmpPath, $destPath)) {
        $attachments[] = ['path' => $destPath, 'name' => $fileName];
    }
}

$adminSubject = "New Job Application: $jobTitle - $name";
$messageBody = "
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 20px; background-color: #fff; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: #fff; padding: 20px; border-radius: 15px 15px 0 0; text-align: center; }
        .content { padding: 25px; border: 1px solid #f0f0f0; border-top: 0; border-radius: 0 0 15px 15px; }
        .row { margin-bottom: 15px; display: flex; border-bottom: 1px solid #f9f9f9; padding-bottom: 10px; }
        .label { font-weight: bold; color: #4f46e5; width: 140px; flex-shrink: 0; }
        .value { color: #333; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin:0;'>New Application Received</h2>
        </div>
        <div class='content'>
            <div class='row'><span class='label'>Position:</span> <span class='value'>$jobTitle</span></div>
            <div class='row'><span class='label'>Name:</span> <span class='value'>$name</span></div>
            <div class='row'><span class='label'>Email:</span> <span class='value'>$email</span></div>
            <div class='row'><span class='label'>Mobile:</span> <span class='value'>$mobile</span></div>
            " . ($link ? "<div class='row'><span class='label'>Portfolio/Link:</span> <span class='value'><a href='$link'>$link</a></span></div>" : "") . "
            <p style='font-size: 11px; color: #aaa; margin-top: 20px;'>Submitted on: " . date("d-M-Y H:i:s") . "</p>
        </div>
    </div>
</body>
</html>
";

$adminMailSent = false;
$errorMsg = '';

try {
    $mail = getMailer();
    $mail->addAddress("contact@digitaltoinfinity.com");
    $mail->addAddress("digitaltoinfinity360@gmail.com");
    $mail->Subject = $adminSubject;
    $mail->isHTML(true);
    $mail->Body = $messageBody;

    foreach ($attachments as $file) {
        if (file_exists($file['path'])) {
            $mail->addAttachment($file['path'], $file['name']);
        }
    }

    $mail->send();
    $adminMailSent = true;
} catch (Exception $e) {
    $adminMailSent = false;
    $errorMsg = $mail->ErrorInfo;
}

if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    try {
        $mailUser = getMailer();
        $mailUser->addAddress($email);
        $mailUser->Subject = "Application Received - Digital Infinity";
        $mailUser->isHTML(true);
        $mailUser->Body = "
            <html>
            <head>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 20px; background-color: #fff; }
                    .header { background: linear-gradient(135deg, #0f172a 0%, #334155 100%); color: #fff; padding: 20px; border-radius: 15px 15px 0 0; text-align: center; }
                    .content { padding: 25px; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h2 style='margin:0;'>Application Received</h2>
                    </div>
                    <div class='content'>
                        <p>Hi $name,</p>
                        <p>Thank you for applying for the <strong>$jobTitle</strong> position at Digital Infinity.</p>
                        <p>We have received your application and will review it shortly.</p>
                        <br>
                        <p>Best Regards,<br><strong>Digital Infinity Team</strong></p>
                    </div>
                </div>
            </body>
            </html>
        ";
        $mailUser->send();
    } catch (Exception $e) {
    }
}

if ($adminMailSent) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Application submitted successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send application.", "debug" => $errorMsg]);
}
?>