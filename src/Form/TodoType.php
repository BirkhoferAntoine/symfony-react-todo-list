<?php

namespace App\Form;

use App\Entity\Todo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class TodoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('task', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Le nom de la tâche ne peut pas être vide']),
                    new Length([
                        'min'   => 2,
                        'max'   => 250,
                        'minMessage' => 'Veuillez insérer au moins 2 caractères pour le nom de la tâche',
                        'maxMessage' => 'Taille maximale dépassée pour le nom de la tâche {{value}}/{{limit}}',
                    ])
                ]
            ])
            ->add('description', TextareaType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'La description ne peut pas être vide']),
                    new Length([
                        'min'   => 2,
                        'max'   => 500,
                        'minMessage' => 'Veuillez insérer au moins 2 caractères pour la description',
                        'maxMessage' => 'Taille maximale dépassée pour la description {{value}}/{{limit}}',
                    ])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class'        => Todo::class,
            'csrf_protection'   => false,
        ]);
    }
}
