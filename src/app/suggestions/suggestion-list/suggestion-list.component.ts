import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../suggestion';
import { SuggestionService } from '../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.css'
})
export class SuggestionListComponent {

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchText: string = "";

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getAllSuggestions().subscribe((data) => {
      this.suggestions = data;
    });
  }

  likeSuggestion(s: Suggestion) {
    s.nbLikes++;
  }

  addToFavorites(s: Suggestion) {
    if (!this.favorites.includes(s)) {
      this.favorites.push(s);
    }
  }

  deleteSuggestion(id: number): void {
    if (confirm('Voulez-vous supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          this.suggestions = this.suggestions.filter(s => s.id !== id);
        },
        error: (error) => console.error('Erreur suppression suggestion', error)
      });
    }
  }

  updateSuggestion(id: number): void {
    this.router.navigate(['/suggestions/update', id]);
  }

  filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
