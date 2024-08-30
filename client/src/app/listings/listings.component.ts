import { Component, OnInit } from '@angular/core';
import { fakeData } from '../fakeData';
import { Listing } from '../models/listing';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss',
})
export class ListingsComponent implements OnInit {
  listings: Listing[] = [];

  ngOnInit(): void {
    this.listings = fakeData;
  }
}
