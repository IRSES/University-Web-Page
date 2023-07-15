<?php
declare(strict_types=1);

namespace App\Services;

use App\Api\CalculateMarkInterface;
use App\Services\GetSpecialities;
use App\Models\Speciality;
use App\Models\Subject;

class CalculateMark implements CalculateMarkInterface
{
    public function calculate(
        string $specialityCode,
        string $thirdSubjectTitle,
        int $ukrScore,
        int $mathScore,
        int $thirdSubjectScore
    ): float {
        $getSpecialitiesService = new GetSpecialities();
        $currSpeciality = array_filter($getSpecialitiesService->execute(), 
            fn (Speciality $speciality) => $speciality->code === $specialityCode
        )[0];

        /** @var Subject[] $mainSubjects */
        $mainSubjects = $currSpeciality->mainSubjects;
        /** @var Subject $secondarySubject */
        $secondarySubject = array_filter($currSpeciality->secondarySubjects,
            fn (Subject $subject) => $subject->title === $thirdSubjectTitle
        );

        return ($ukrScore + $mathScore + $thirdSubjectScore) / 
            ($mainSubjects[0]->coef + $mainSubjects[1]->coef + $secondarySubject->coef);
    }
}