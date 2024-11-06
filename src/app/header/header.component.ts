import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [FormsModule],
})
export class HeaderComponent implements OnInit {
  title = 'landingDragonBall';
  characterName: string = '';
  characterId: string = '';

  constructor(
    private apiCallService: ApiCallService,
    private route: ActivatedRoute, // Inyectar ActivatedRoute para los parámetros de la URL
    private router: Router // Inyectar Router para navegación
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los parámetros de la URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== this.characterId) {
        this.characterId = id; // Actualizar el ID del personaje cuando cambia en la URL
        this.getCharacterDetails(); // Llamar al método para cargar los detalles del personaje
      }
    });
  }

  /*   ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterName']) {
      // Si el ID del personaje ha cambiado, navegar a la nueva ruta
      this.router.navigate(['/characters', this.characterId]);
    }
  } */

  // Método para manejar el envío del formulario
  onSubmit(form: any) {
    this.characterName = form.value.nombre.trim();
    console.log('Nombre del personaje:', this.characterName);
    this.getCharacterDetails();
  }

  // Método para obtener los detalles del personaje por nombre
  async getCharacterDetails() {
    if (this.characterName) {
      try {
        // Realizar la llamada al servicio para obtener los detalles del personaje por nombre
        const data = await this.apiCallService.fetchCharacterByName(
          this.characterName
        );
        if (data && data[0]) {
          this.characterId = data[0].id; // Establecer el ID del personaje desde la respuesta
          this.router.navigate(['/characters', this.characterId]); // Redirigir a la ruta con el nuevo ID
          console.log('Detalles del personaje:', data);
          console.log('character id:', this.characterId);
        } else {
          console.log('No se encontró el personaje.');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del personaje:', error);
      }
    } else {
      console.log('Por favor, ingrese un nombre de personaje.');
    }
  }
}
