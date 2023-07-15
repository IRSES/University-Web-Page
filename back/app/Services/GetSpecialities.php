<?php
declare(strict_types=1);

namespace App\Services;

use App\Api\GetSpecialitiesInterface;
use App\Models\Speciality;
use App\Models\Subject;

class GetSpecialities implements GetSpecialitiesInterface
{
    /**
     * @return \App\Models\Speciality[]
     */
    public function execute(): array
    {
        $specialities = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/data/specialities.json'), true);

        return array_map(function ($speciality) {
            $speciality['mainSubjects'] = $this->mapSubjects($speciality['mainSubjects']);
            $speciality['secondarySubjects'] = $this->mapSubjects($speciality['secondarySubjects']);
            $speciality['minContract'] = $speciality['minContract'] ?? null;
            
            return new Speciality(...$speciality);
        }, $specialities);
    }

    /**
     * @return \App\Models\Subject[]
     */
    private function mapSubjects(array $subjects): array
    {
        return array_map(fn ($subject) => new Subject(...$subject), $subjects);
    }
}