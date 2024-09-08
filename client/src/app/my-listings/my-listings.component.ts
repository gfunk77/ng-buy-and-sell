import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Listing } from '../models/listing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './my-listings.component.html',
  styleUrl: './my-listings.component.scss',
})
export class MyListingsComponent implements OnInit {
  listingsService = inject(ListingsService);
  listings: Listing[] = [];

  ngOnInit(): void {
    this.listingsService.getListingsForUser().subscribe((listings) => {
      this.listings = listings;
    });
  }

  onDelete(id: string): void {
    this.listingsService.deleteListing(id).subscribe(() => {
      this.listings = this.listings.filter((listing) => listing.id !== id);
    });
  }
}
