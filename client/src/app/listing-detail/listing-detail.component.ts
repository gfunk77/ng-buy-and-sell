import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Listing } from '../models/listing';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.scss',
})
export class ListingDetailComponent implements OnInit {
  listingService = inject(ListingsService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  listing: Listing | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // const item = fakeData.find((listing) => listing.id === id);
    // if (item) {
    //   this.listing = item;
    // }
    // if (id) {
    //   this.listingService.getListing(id).subscribe({
    //     next: (listing) => {
    //       this.listing = listing;
    //       this.isLoading = false;
    //     },
    //   });
    // }
    console.log(id);
    if (!id) return;
    this.listingService
      .getListing(id)
      .subscribe((listing) => (this.listing = listing));
  }

  goBack() {
    this.router.navigate(['/listings']);
  }

  toContact(id: string) {
    this.router.navigate(['/contact', id]);
  }
}
