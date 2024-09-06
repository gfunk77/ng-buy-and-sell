import { Component, inject, OnInit } from '@angular/core';
import { Listing } from '../models/listing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss',
})
export class ListingsComponent implements OnInit {
  listingService = inject(ListingsService);
  listings: Listing[] = [];

  ngOnInit(): void {
    this.listingService
      .getListings()
      .subscribe((listings) => (this.listings = listings));
  }
}
