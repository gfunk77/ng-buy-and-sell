import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fakeData } from '../fakeData';
import { Listing } from '../models/listing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
  listings: Listing[] = [];

  ngOnInit(): void {
    this.listings = fakeData;
  }

  onDelete(id: string): void {
    console.log('Delete listing with id: ', id);
  }
}
