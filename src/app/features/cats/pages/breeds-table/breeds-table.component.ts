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
        // Al inicio no mostramos datos hasta que el usuario ingrese un criterio.
        // Si el usuario ya escribió algo antes de que llegaran los datos, aplicamos el filtro.
        if (this.searchTerm.trim()) {
          this.onSearch();
        } else {
          this.filteredBreeds = [];
        }
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
      // Si no hay criterio de búsqueda, no mostramos filas
      this.filteredBreeds = [];
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
