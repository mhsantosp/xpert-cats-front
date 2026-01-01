import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
export class CatsHomeComponent {
  // Lista mock de razas para la vista 1 (luego se podrá mover a un servicio)
  breeds: BreedDetail[] = [
    {
      id: 'abys',
      name: 'Abyssinian',
      origin: 'Ethiopia',
      lifeSpan: '14-15',
      temperament: 'Active, Energetic',
      description:
        'La raza Abyssinian es muy activa, curiosa y juguetona. Le gusta explorar y relacionarse con las personas.',
      imageUrls: [
        'https://placekitten.com/400/250',
        'https://placekitten.com/401/250',
        'https://placekitten.com/402/250',
      ],
    },
    {
      id: 'beng',
      name: 'Bengal',
      origin: 'United States',
      lifeSpan: '12-16',
      temperament: 'Alert, Agile',
      description:
        'El Bengal es un gato muy activo, de apariencia salvaje pero sociable y con alta energía.',
      imageUrls: [
        'https://placekitten.com/410/250',
        'https://placekitten.com/411/250',
      ],
    },
    {
      id: 'pers',
      name: 'Persian',
      origin: 'Iran',
      lifeSpan: '10-17',
      temperament: 'Calm, Gentle',
      description:
        'El Persa es una raza tranquila, cariñosa y de baja actividad, ideal para ambientes relajados.',
      imageUrls: [
        'https://placekitten.com/420/250',
        'https://placekitten.com/421/250',
      ],
    },
  ];

  selectedBreedId: string = this.breeds[0]?.id ?? '';
  currentImageIndex = 0;

  get selectedBreed(): BreedDetail | undefined {
    return this.breeds.find((b) => b.id === this.selectedBreedId);
  }

  onBreedChange(): void {
    // Resetear carrusel al cambiar de raza
    this.currentImageIndex = 0;
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
