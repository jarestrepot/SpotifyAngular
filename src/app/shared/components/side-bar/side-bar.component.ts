import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass]
})
export class SideBarComponent implements OnInit, OnDestroy {

  // linksMenu:Array<any> =[
  //   {
  //     name: "Home",
  //     icon: "uil-home"
  //   },
  //   {
  //     name: "Seach",
  //     icon: "uil-home"
  //   }
  // ];

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] };

  customOptions: Array<any> = []

  constructor(private router: Router){}

  ngOnInit():void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query:{gender: 'Rock'}
      }
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]
  }

  ngOnDestroy(): void {

  }

  routerGoTo(event:any, item:any):void{
    // TODO: los query deberian de ser un genero favorito si se quiere.
    this.router.navigate(item.router, item.query && {
      queryParams:
        item.query
    });
  }
}
