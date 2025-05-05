<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['status' => 'no data received']);
    exit;
}

$message = "📩 فرم جدید:\n";

foreach ($data as $key => $value) {
    $message .= "🔹 *" . ucfirst($key) . "*: " . $value . "\n";
}

    // تنظیمات ربات
    $token = "7759452439:AAEKknswbGYyGWabiVWWQQc5R5U0Zl-BZRU";
    $chat_id = "109004266";

$send_url = "https://api.telegram.org/bot$bot_token/sendMessage";
$params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'Markdown'
];

$response = file_get_contents($send_url . '?' . http_build_query($params));

echo json_encode(['status' => 'done', 'telegram_response' => $response]);
