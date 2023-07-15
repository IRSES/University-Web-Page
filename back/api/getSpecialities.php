<?php

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header("Access-Control-Allow-Headers: " . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
header('Content-Type: application/json');

echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/data/specialities.json');
