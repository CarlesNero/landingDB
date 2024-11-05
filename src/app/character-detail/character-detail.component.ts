import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCharacterDetails(id);
  }

  async getCharacterDetails(id: string | null) {
    if (id) {
      const data = await this.apiCallService.fetchCharacterById(id); // Implement this method in ApiCallService
      this.character = data;
    }
  }
}
