import { Suggestion } from './../suggestion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | null = null;

  constructor(
    private ar: ActivatedRoute,
    private r: Router,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      const id = +params['id'];
      this.loadSuggestion(id);
    });
  }

  loadSuggestion(id: number): void {
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => {
        this.suggestion = data.suggestion || data;
      },
      error: (error: any) => {
        console.error('Error loading suggestion:', error);
      }
    });
  }

  backToList() {
    this.r.navigate(['/suggestions']);
  }
}
