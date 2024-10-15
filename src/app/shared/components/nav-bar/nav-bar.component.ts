import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  private router = inject(Router);

  goToVisaForm() { this.router.navigate(['visa-form'])}
  goToHome() { this.router.navigate([''])}
}
