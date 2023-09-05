import { Component } from '@angular/core';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { PlayListHeaderComponent } from '../../../../shared/components/play-list-header/play-list-header.component';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.scss'],
    standalone: true,
    imports: [PlayListHeaderComponent, PlayListBodyComponent]
})
export class FavoriteComponent {

}
