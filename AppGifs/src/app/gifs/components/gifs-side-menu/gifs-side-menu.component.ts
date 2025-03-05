import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from "./gifs-side-menu-header/gifs-side-menu-header.component";
import { GifsSideMenuOpiontsComponent } from "./gifs-side-menu-options/gifs-side-menu-opionts.component";

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOpiontsComponent],
  templateUrl: './gifs-side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuComponent { }
