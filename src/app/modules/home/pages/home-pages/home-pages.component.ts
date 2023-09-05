import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MediaPlayerComponent } from '../../../../shared/components/media-player/media-player.component';
import { SideBarComponent } from '../../../../shared/components/side-bar/side-bar.component';
// import { }

@Component({
    selector: 'app-home-pages',
    templateUrl: './home-pages.component.html',
    styleUrls: ['./home-pages.component.scss'],
    standalone: true,
    imports: [SideBarComponent, MediaPlayerComponent, RouterOutlet]
})
export class HomePagesComponent {

}
