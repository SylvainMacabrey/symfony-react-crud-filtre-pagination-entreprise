<?php

namespace App\Controller;

use App\Repository\DepartmentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiDepartmentController extends AbstractController
{

    public function __construct(DepartmentRepository $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
    }

    #[Route('/api/departments', name: 'department.index')]
    public function index(): Response
    {
        return $this->json($this->departmentRepository->findAll(), 200, [], ['groups' => 'department.show']);
    }
}
