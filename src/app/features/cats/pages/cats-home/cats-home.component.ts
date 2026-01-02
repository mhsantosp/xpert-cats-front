import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CatsApiService, CatBreedDto, CatImageDto } from '../../../../data/cats-api.service';

interface BreedDetail {
  id: string;
  name: string;
  origin: string;
  lifeSpan: string;
  temperament: string;
  description: string;
  imageUrls: string[];
}

@Component({
  selector: 'app-cats-home',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cats-home.component.html',
  styleUrl: './cats-home.component.scss',
})
export class CatsHomeComponent implements OnInit {
  breeds: BreedDetail[] = [];
  selectedBreedId = '';
  currentImageIndex = 0;

  constructor(private readonly catsApi: CatsApiService) {}

  ngOnInit(): void {
    this.catsApi.getBreeds().subscribe({
      next: (breeds: CatBreedDto[]) => {
        console.log('1. Raw breeds data:', breeds[0]);
        this.breeds = breeds.map((b) => ({
          id: b.id,
          name: b.name,
          origin: b.origin,
          lifeSpan: b.lifeSpan,
          temperament: b.temperament,
          description: b.description,
          imageUrls: [],
        }));
        console.log('2. Loaded breeds:', this.breeds[0]);

        if (this.breeds.length > 0) {
          console.log('3. Setting first breed as selected:');

          this.selectedBreedId = this.breeds[0].id;
          this.loadImagesForSelectedBreed();
        }
      },
      error: (error) => {
        console.log('4. Failed to load cat breeds:', error);
        this.breeds = [];
      },
    });
  }

  get selectedBreed(): BreedDetail | undefined {
    return this.breeds.find((b) => b.id === this.selectedBreedId);
  }

  onBreedChange(): void {
    this.currentImageIndex = 0;
    this.loadImagesForSelectedBreed();
  }

  private loadImagesForSelectedBreed(): void {
    const breedId = this.selectedBreedId;
    if (!breedId) return;

    this.catsApi.getImagesByBreedId(breedId).subscribe({
      next: (images: CatImageDto[]) => {
        const urls = images.map((img) => img.url);
        const breed = this.selectedBreed;
        if (breed) {
          breed.imageUrls = urls;
          this.currentImageIndex = 0;
        }
      },
      error: () => {
        const breed = this.selectedBreed;
        if (breed) {
          breed.imageUrls = [];
        }
      },
    });
  }

  nextImage(): void {
    const images = this.selectedBreed?.imageUrls ?? [];
    if (!images.length) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
  }

  prevImage(): void {
    const images = this.selectedBreed?.imageUrls ?? [];
    if (!images.length) return;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + images.length) % images.length;
  }
}
