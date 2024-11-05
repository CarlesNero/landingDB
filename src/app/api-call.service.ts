import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor() {}

  page = 1;
  limit = 12;

  async fetchCharacters(page: number = this.page, limit: number = this.limit) {
    const response = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  }
}
