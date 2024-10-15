import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private router = inject(Router);
  ngOnInit() {}

  goToVisaForm() { this.router.navigate(['visa-form'])}
}
