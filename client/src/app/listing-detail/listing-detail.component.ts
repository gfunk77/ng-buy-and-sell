import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Listing } from '../models/listing';
import { ListingsService } from '../listings.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.scss',
})
export class ListingDetailComponent implements OnInit {
  listingService = inject(ListingsService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  listing!: Listing;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.listingService.addViewToListing(id).subscribe(() => {
      console.log('View added');
    });
    this.listingService.getListing(id).subscribe((listing) => {
      this.listing = listing;
      this.isLoading = false;
    });
  }

  goBack() {
    this.router.navigate(['/listings']);
  }

  toContact(id: string) {
    this.router.navigate(['/contact', id]);
  }
}
