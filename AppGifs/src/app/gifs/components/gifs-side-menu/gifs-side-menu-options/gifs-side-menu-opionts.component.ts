import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';
import { Gif } from 'src/app/interfaces/gif.interface';

interface MenuOption {
  label: string;
  subLabel:string;
  router: string;

  icon:string;
}


@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './gifs-side-menu-options.component.html',

})
export class GifsSideMenuOpiontsComponent {
  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Find the most popular gifs',
      router: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Search for your favorite gifs',
      router: '/dashboard/search'
    }
  ]


}
