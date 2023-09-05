import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule,
        FavoriteComponent
    ]
})
export class FavoritesModule { }
