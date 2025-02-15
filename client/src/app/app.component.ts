import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  breakpointObserver = inject(BreakpointObserver);
  user$ = this.authService.user$;
  title = 'Buy and Sell';
  links = [
    { path: '/listings', title: 'listings', icon: 'shop' },
    { path: 'my-listings', title: 'my listings', icon: 'sell' },
  ];
  isScreenSmall = false;

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isScreenSmall = result.matches;
      });
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signOutOfGoogle() {
    this.authService.signOut();
  }
}
