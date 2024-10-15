import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  ngOnInit() {

    // window.addEventListener('wheel', (event) => {
    //   event.preventDefault(); // Empêche l'erreur
    // }, { passive: false });
    //
    if (typeof window !== 'undefined') {
      // votre code utilisant 'window'
      const lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 500)
      })
      gsap.ticker.lagSmoothing(0);
    }
  }
}
