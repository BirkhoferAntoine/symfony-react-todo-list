<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use SebastianBergmann\Diff\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/todo', name: 'api_todo')]
class TodoController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository) {

        $this->entityManager    = $entityManager;
        $this->todoRepository   = $todoRepository;
    }


    #[Route('/read', name: 'api_todo_read', methods: 'GET')]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];

        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
        /*
        return $this->render('todo/index.html.twig', [
            'controller_name' => 'TodoController',
        ]);*/
    }

    /**
     * @throws \JsonException
     */
    #[Route('/create', name: 'api_todo_create', methods: 'POST')]
    public function create(Request $request, ValidatorInterface $validator): Response
    {
        $content = json_decode($request->getContent(), false, 512, JSON_THROW_ON_ERROR);

        $todo = new Todo();

        $form = $this->createForm(TodoType::class);
        $contentArray = (array)$content;
        unset($contentArray['id']);
        $form->submit($contentArray);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(true, true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }

            return $this->json([
                'message' =>
                    [
                        'text'  => implode("\n", $errors), // Needs "" for \n
                        'level' => 'error'
                    ]
            ]);
        }

        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message'   => [
                    'text'      => ['Could not reach database while attempting to create a To-do'],
                    'level'     => 'error'
                ]
            ]);
        }

        return $this->json([
            'todo'      => $todo->toArray(),
            'message'   => [
                'text'      =>
                    [
                        'Todo successfully created',
                        'Task: '.$content->task
                    ],
                'level' => 'success'
            ]
        ]);
    }

    /**
     * @throws \JsonException
     */
    #[Route('/update/{id}', name: 'api_todo_update', requirements: ['id' => '\d+'], methods: 'PUT')]
    public function update(Request $request, Todo $todo): Response
    {
        $content = json_decode($request->getContent(), false, 512, JSON_THROW_ON_ERROR);

        $task           = $content->task;
        $description    = $content->description;

        if ($task === $todo->getTask() && $description === $todo->getDescription()) {
            return $this->json([
                'message' => [
                    'text'  => 'There was no change done to the To-do. Neither task or description changed',
                    'level' => 'warning'
                ]
            ]);
        }
        $todo->setTask($task);
        $todo->setDescription($description);

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => 'Could not reach database while attempting to update a To-do',
            ]);
        }

        return $this->json([
            'todo'      => $todo->toArray(),
            'message'   => [
                'text'      => 'Todo successfully updated',
                'level'     => 'success'
            ],
        ]);
    }

    /**
     * @throws \JsonException
     */
    #[Route('/delete/{id}', name: 'api_todo_delete', requirements: ['id' => '\d+'], methods: 'DELETE')]
    public function delete(Todo $todo): Response
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([
                'message' => 'Could not reach database while attempting to delete a To-do',
            ]);
        }

        return $this->json([
            'message' => 'Todo successfully deleted',
        ]);
    }
}
