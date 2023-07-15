<?php
declare(strict_types=1);

namespace App\Models;

class Speciality
{
    /** 
     * @var \App\Models\Subject[] $secondarySubjects
     * @var \App\Models\Subject[] $mainSubjects 
    */
    public function __construct(
        public string $code,
        public string $title,
        public string $program,
        public ?int $minContract,
        public array $mainSubjects,
        public array $secondarySubjects
    ) {
    }
}