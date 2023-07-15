<?php

namespace App\Api;

interface CalculateMarkInterface
{
    public function calculate(
        string $specialityCode, 
        string $thirdSubjectTitle, 
        int $ukrScore,
        int $mathScore,
        int $thirdSubjectScore
    ): float;
}