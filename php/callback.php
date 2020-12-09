<?php
require '../../library/Mailer.php';

if (!empty($_POST)) {

    $params = [
        ['title' => 'Адрес сайта или Тематика проекта:', 'answer' => strip_tags($_POST["site"])],
        ['title' => 'Email или Мессенджер:', 'answer' => strip_tags($_POST["contact"])],
        ['title' => 'Пример нужных запросов: ', 'answer' => strip_tags($_POST["examples"])],
        ['title' => 'Сколько ТЗ нужно: ', 'answer' => strip_tags($_POST["count"])],
        ['title' => 'Где вы узнали о наших услугах: ', 'answer' => strip_tags($_POST["fromKnow"])],
    ];

    $mail = new Library\Mailer($params);
    $mail->Subject = 'Semantic Core Site Order';
    $mail->addAddress('alex.pavlutskiy@gmail.com');
    $success = $mail->send();
    if (!$success) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        die();
    }
    echo json_encode(['success' => true]);
    die();
} else {
    header('Location: index.html');
}
