import { Routes } from '@angular/router';
import { CharacterDisplayComponent } from './character-display/character-display.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

export const routes: Routes = [
  { path: '', component: CharacterDisplayComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
];
