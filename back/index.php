<?php
declare(strict_types=1);

require_once './vendor/autoload.php';

use App\Services\GetSpecialities;

$getSpecialitiesService = new GetSpecialities();
echo "<pre>";
var_dump($getSpecialitiesService->execute());
