import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-breeds-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './breeds-table.component.html',
  styleUrl: './breeds-table.component.scss',
})
export class BreedsTableComponent {
  searchTerm = '';

  breeds = [
    { name: 'Abyssinian', origin: 'Ethiopia', lifeSpan: '14-15', temperament: 'Active, Energetic', intelligence: 5 },
    { name: 'Bengal', origin: 'United States', lifeSpan: '12-16', temperament: 'Alert, Agile', intelligence: 5 },
    { name: 'Persian', origin: 'Iran', lifeSpan: '10-17', temperament: 'Calm, Gentle', intelligence: 3 },
    { name: 'Siamese', origin: 'Thailand', lifeSpan: '15-20', temperament: 'Affectionate, Social', intelligence: 5 },
  ];

  filteredBreeds = [...this.breeds];

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredBreeds = [...this.breeds];
      return;
    }

    this.filteredBreeds = this.breeds.filter((breed) => {
      return (
        breed.name.toLowerCase().includes(term) ||
        breed.origin.toLowerCase().includes(term) ||
        breed.temperament.toLowerCase().includes(term)
      );
    });
  }
}
