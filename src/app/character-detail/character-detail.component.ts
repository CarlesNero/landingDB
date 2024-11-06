import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  title = '';

  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit(): void {
   
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getCharacterDetails(id);
      }
    });
  }


  async getCharacterDetails(id: string) {
    try {
      const data = await this.apiCallService.fetchCharacterById(id);
      this.character = data;
      this.title = this.character?.name || 'Unknown Character'; // Set a default name if not found
    } catch (error) {
      console.error('Error fetching character details:', error);

    }
  }


  reloadPage() {
    window.location.reload();
  }
}
