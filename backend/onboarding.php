<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'mail_config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "No data received"]);
        exit;
    }

    // --- PREPARE CSV CONTENT ---
    $csvData = [
        ['Business Name', $data['businessName'] ?? ''],
        ['Industry', $data['industry'] ?? ''],
        ['Other Industry', $data['otherIndustry'] ?? ''],
        ['Establishment Year', $data['establishmentYear'] ?? ''],
        ['Description', $data['description'] ?? ''],
        ['Website', $data['website'] ?? ''],
        ['Google Profile', $data['googleProfile'] ?? ''],
        ['Facebook Link', $data['facebookLink'] ?? ''],
        ['Instagram Link', $data['instagramLink'] ?? ''],
        ['Address', $data['address'] ?? ''],
        ['Contact Name', $data['contactName'] ?? ''],
        ['Designation', $data['designation'] ?? ''],
        ['Email', $data['email'] ?? ''],
        ['Mobile', $data['mobile'] ?? ''],
        ['WhatsApp', $data['whatsapp'] ?? ''],
        ['Primary Goal', $data['primaryGoal'] ?? ''],
        ['Past Experience', $data['pastExperience'] ?? ''],
        ['Previous Agency', $data['previousAgency'] ?? ''],
        ['Reason for Switching', $data['reasonSwitching'] ?? ''],
        ['Selected Package', $data['selectedPackage'] ?? ''],
    ];

    $filename = "onboarding_" . preg_replace('/[^a-zA-Z0-9]/', '_', $data['businessName'] ?? 'lead') . "_" . date("Y-m-d") . ".csv";
    $csvContent = "";
    foreach ($csvData as $row) {
        $escapedRow = array_map(function ($field) {
            $field = (string) $field;
            return '"' . str_replace('"', '""', $field) . '"';
        }, $row);
        $csvContent .= implode(",", $escapedRow) . "\n";
    }

    // --- SEND ADMIN EMAIL (WITH ATTACHMENT) ---
    $adminMailSent = false;
    $errorInfo = '';

    try {
        $mail = getMailer();
        $mail->addAddress("contact@digitaltoinfinity.com");
        $mail->addAddress("digitaltoinfinity360@gmail.com");

        $mail->Subject = "New Onboarding Submission: " . ($data['businessName'] ?? 'Unknown Business');
        $mail->Body = "You have received a new onboarding form submission. Please find the details attached in the CSV file.";
        $mail->addStringAttachment($csvContent, $filename);

        $mail->send();
        $adminMailSent = true;
    } catch (Exception $e) {
        $adminMailSent = false;
        $errorInfo = $mail->ErrorInfo;
    }

    // --- SEND USER GREETING EMAIL ---
    $userEmail = $data['email'] ?? '';
    if ($userEmail && filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
        try {
            $mailUser = getMailer();
            $mailUser->addAddress($userEmail);
            $mailUser->Subject = "Welcome to Digital To Infinity!";
            $mailUser->isHTML(true);
            $mailUser->Body = "
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
                .header { background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { padding: 30px 20px; }
                .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class='container'>
                <div class='header'>
                  <h2>Welcome Aboard!</h2>
                </div>
                <div class='content'>
                  <p>Hi " . htmlspecialchars($data['contactName'] ?? 'there') . ",</p>
                  <p>Thank you for choosing <strong>Digital To Infinity</strong>. We have successfully received your details.</p>
                  <p>Our team is reviewing your information to kickstart your journey with us. We will reach out to you shortly to discuss the next steps.</p>
                  <p>If you have any queries, feel free to reply to this email.</p>
                  <br>
                  <p>Best Regards,<br><strong>Team Digital To Infinity</strong></p>
                </div>
                <div class='footer'>
                  &copy; " . date("Y") . " Digital To Infinity. All rights reserved.
                </div>
              </div>
            </body>
            </html>
        ";
            $mailUser->send();
        } catch (Exception $e) {
            // Log user email error quietly
        }
    }

    if ($adminMailSent) {
        echo json_encode(["success" => true, "message" => "Form submitted successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to send email.", "debug" => $errorInfo]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
}
?>