import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CatsApiService, CatBreedDto } from '../../../../data/cats-api.service';

@Component({
  selector: 'app-breeds-table',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './breeds-table.component.html',
  styleUrl: './breeds-table.component.scss',
})
export class BreedsTableComponent implements OnInit {
  searchTerm = '';
  breeds: CatBreedDto[] = [];
  filteredBreeds: CatBreedDto[] = [];

  constructor(private readonly catsApi: CatsApiService) {}

  ngOnInit(): void {
    this.catsApi.getBreeds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.filteredBreeds = [...breeds];
      },
      error: () => {
        this.breeds = [];
        this.filteredBreeds = [];
      },
    });
  }

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
