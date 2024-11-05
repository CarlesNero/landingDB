import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-display',
  standalone: true,
  imports: [],
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css'],
})
export class CharacterDisplayComponent implements OnInit {
  characters: any[] = [];

  constructor(private apiCallService: ApiCallService, private router: Router) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  async getCharacters() {
    const data = await this.apiCallService.fetchCharacters();
    this.characters = data.items;
    console.log(this.characters);
  }

  async nextPage() {
    this.apiCallService.page++;
    const data = await this.apiCallService.fetchCharacters(
      this.apiCallService.page
    );
    this.characters = data.items;
  }

  async prevPage() {
    if (this.apiCallService.page > 1) {
      this.apiCallService.page--;
    }
    const data = await this.apiCallService.fetchCharacters(
      this.apiCallService.page
    );
    this.characters = data.items;
  }

  goToCharacterDetail(id: number) {
    this.router.navigate([`/characters`, id]); // Navigate to /characters/:id
  }
}
