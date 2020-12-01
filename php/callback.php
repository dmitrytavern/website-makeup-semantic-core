<?php

if (!empty($_POST))
{
    $ADDRESS_FROM = 'Semantic Core Site <nx-agency.com>';
    $ADDRESS_TO = 'k.lyovushkin@gmail.com';
    $MAIL_SUBJECT = 'Semantic Core Site Order';

    // To send HTML mail, the Content-type header must be set
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'X-Mailer: PHP/'.PHP_VERSION;
    $headers[] = 'Content-type: text/html; charset=utf-8';

    // Additional headers
    $headers[] = 'from: Semantic Core Site';
    $headers[] = 'reply-to: '.$ADDRESS_FROM;


    if (!empty($_POST['contact'])) {

        $message = '
        <html>
            <head>
              <title>Semantic Core Site Order</title>
            </head>
            <body style="color: #000000;">
              <table style="padding: 30px 0">
                <tr style="padding: 5px 0;">
                  <td style="padding-right: 15px; font-size: 16px;"><b>Адрес сайта или Тематика проекта: </b></td><td>'. $_POST["site"] .'</td>
                </tr>
                <tr style="padding: 5px 0;">
                  <td style="padding-right: 15px; font-size: 16px;"><b>Email или Мессенджер: </b></td><td>'. $_POST["contact"] .'</td>
                </tr>
                <tr style="padding: 5px 0;">
                  <td style="padding-right: 15px; font-size: 16px;"><b>Пример нужных запросов: </b></td><td>'. $_POST["examples"] .'</td>
                </tr>
                <tr style="padding: 5px 0;">
                  <td style="padding-right: 15px; font-size: 16px;"><b>Сколько ТЗ нужно: </b></td><td>'. $_POST["count"] .'</td>
                </tr>
                <tr style="padding: 5px 0;">
                  <td style="padding-right: 15px; font-size: 16px;"><b>Где вы узнали о наших услугах: </b></td><td>'. $_POST["fromKnow"] .'</td>
                </tr>
              </table>
            </body>
            </html>
        ';

        $success = mail(
            $ADDRESS_TO,
            $MAIL_SUBJECT,
            $message,
            implode("\r\n", $headers)
        );

		if (!$success) {
			echo 'Error';
            echo error_get_last()['message'];
        }

        $arr = array('success' => $success);
        echo json_encode($arr);
    } else {
        $arr = array('success' => false);
        echo json_encode($arr);
    }

//    echo $_POST['site'];
//    echo $_POST['contact'];
//    echo $_POST['examples'];
//    echo $_POST['count'];
//    echo $_POST['fromKnow'];
}
else
{
    header('Location: index.html');
}
