import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoriteComponent } from './pages/favorite/favorite.component';



@NgModule({
    imports: [
    CommonModule,
    FavoritesRoutingModule,
    FavoriteComponent
]
})
export class FavoritesModule { }
