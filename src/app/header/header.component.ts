import { Component, OnInit } from '@angular/core';
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
      if (id) {
        this.characterId = id; // Actualizar el ID del personaje cuando cambia en la URL
        this.getCharacterDetails(); // Llamar al método para cargar los detalles del personaje
      }
    });
  }

  // Método para manejar el envío del formulario
  onSubmit(form: any) {
    this.characterName = form.value.nombre.trim();
    console.log('Nombre del personaje:', this.characterName);
    this.getCharacterDetails();
  }

  async getCharacterDetails() {
    if (this.characterName) {
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
    } else {
      console.log('Por favor, ingrese un nombre de personaje.');
    }
  }
}
