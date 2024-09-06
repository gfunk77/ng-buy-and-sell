import { inject, Injectable } from '@angular/core';
import { Listing } from './models/listing';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  http = inject(HttpClient);

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  constructor() {}
}
