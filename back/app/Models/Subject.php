<?php
declare(strict_types=1);

namespace App\Models;

class Subject
{
    public function __construct(
        public string $title,
        public float $coef
    ) {  
    }
}