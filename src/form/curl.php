<?php

// URL, куда отправляется запрос
$url = 'http://80.90.191.111:6000/set_data';

// Данные для отправки в формате JSON
$data = array(
  "nick" => "sufirt",
  "email" => "baimanov.roman@gmail.com",
  "telegram" => "baimanov.roman",
  "currency" => "ETH",
  "game" => "Dota"
);

$json_data = json_encode($data);

// Настройки cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Выполнение запроса и получение ответа
$response = curl_exec($ch);

// Проверка на наличие ошибок
if(curl_errno($ch)){
    echo curl_error($ch);
}

// Закрытие cURL сеанса
curl_close($ch);

// Вывод ответа
echo $response;
