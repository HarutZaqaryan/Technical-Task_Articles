import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public adminBtnColor: string = 'primary';
  public userBtnColor: string = 'warn';

  constructor(private router: Router) {}

  // These two functions are responsible for the color of the navigation buttons,
  // if we are on the admin page, the admin button changes color,
  // it works similarly with the user button.
  adminBtnClick(): void {
    this.router.navigate(['/', 'admin']);
    setTimeout(() => {
      if (this.router.url === '/admin') {
        this.adminBtnColor = 'warn';
        this.userBtnColor = 'primary';
      }
    }, 100);
  }

  userBtnClick(): void {
    this.router.navigate(['/', 'user']);
    setTimeout(() => {
      if (this.router.url === '/user') {
        this.adminBtnColor = 'primary';
        this.userBtnColor = 'warn';
      }
    }, 100);
  }
}
