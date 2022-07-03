<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Employee;
use App\Entity\Department;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $departments = ['Informatique', 'Comptabilité', 'Service commercial', 'Direction financière', 'Resouce humaine', 'Marketing'];

        foreach($departments  as $departmentName) {
            $department = new Department();
            $department->setName($departmentName);
            $department->setAddress($faker->address);
            $manager->persist($department);

            for($i = 0; $i < 10; $i++) {
                $employee = new Employee();
                $lastname = $faker->lastname;
                $employee->setLastname($lastname);
                $firstname = $faker->firstname;
                $employee->setFirstname($firstname);
                $employee->setAge(rand(18, 65));
                $employee->setDepartment($department);
                $employee->setEmail($firstname . '.' . $lastname . '@gmail.com');
                $manager->persist($employee);
            }
        }

        $manager->flush();
    }
}
