import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../suggestion';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  suggestionId!: number;
  isEditMode: boolean = false;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];
  currentDate = new Date();
  defaultStatus = 'EN ATTENTE';

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[A-Z][a-zA-Z ]*$')
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [this.currentDate],
      status: [this.defaultStatus],
      nbLikes: [0]
    });

    this.ar.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.suggestionId = +params['id'];

        this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
          next: (data) => {
            this.suggestionForm.patchValue(data.suggestion || data);
          },
          error: (error) => console.error('Erreur chargement suggestion', error)
        });
      }
    });
  }

  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }

  submitSuggestion(): void {
    if (this.suggestionForm.invalid) {
      this.suggestionForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.suggestionService.updateSuggestion(this.suggestionId, this.suggestionForm.value).subscribe({
        next: () => this.router.navigate(['/suggestions']),
        error: (error: any) => console.error('Erreur modification suggestion', error)
      });
    } else {
      this.suggestionService.addSuggestion(this.suggestionForm.value).subscribe({
        next: () => this.router.navigate(['/suggestions']),
        error: (error: any) => console.error('Erreur ajout suggestion', error)
      });
    }
  }
}
