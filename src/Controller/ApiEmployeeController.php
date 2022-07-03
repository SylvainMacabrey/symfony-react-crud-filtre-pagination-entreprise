<?php

namespace App\Controller;

use App\Entity\Employee;
use App\Repository\DepartmentRepository;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Doctrine\ORM\QueryAdapter;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

class ApiEmployeeController extends AbstractController
{

    public function __construct(EmployeeRepository $employeeRepository, DepartmentRepository $departmentRepository, EntityManagerInterface $em)
    {
        $this->employeeRepository = $employeeRepository;
        $this->departmentRepository = $departmentRepository;
        $this->em = $em;
    }

    #[Route('/api/employees', name: 'employee.index', methods: ['GET'])]
    public function index(Request $request): Response
    {
        $page = $request->query->get('page', 1);
        $department = $request->query->get('department');
        $name = $request->query->get('name');

        $employees = $this->employeeRepository->getEmployees($department, $name);

        //$pager = new Pagerfanta(new QueryAdapter($employees));
        //$pager->setCurrentPage($page);
        //$pager->setMaxPerPage(5);
        $pager = Pagerfanta::createForCurrentPageWithMaxPerPage(new QueryAdapter($employees), $page, 5);

        return $this->json($pager, 200, [], ['groups' => 'employee.show']);
    }

    #[Route('/api/employee', name: 'employee.create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent());
        $employee = new Employee();
        $employee->setFirstname($data->firstname);
        $employee->setLastname($data->lastname);
        $employee->setEmail($data->email);
        $employee->setAge($data->age);
        $employee->setDepartment($this->departmentRepository->find($data->department->id));
        $this->em->persist($employee);
        $this->em->flush();
        return $this->json($employee, 201, [], ['groups' => 'employee.show']);
    }


    #[Route('/api/employee/{id}', name: 'employee.update', methods: ['PUT'])]
    public function update(Request $request, int $id)
    {
        $data = json_decode($request->getContent());
        $employee = $this->employeeRepository->find($id);
        $employee->setFirstname($data->firstname);
        $employee->setLastname($data->lastname);
        $employee->setEmail($data->email);
        $employee->setAge($data->age);
        $employee->setDepartment($this->departmentRepository->find($data->department->id));
        $this->em->flush();
        return $this->json($employee, 201, [], ['groups' => 'employee.show']);
    }

}
