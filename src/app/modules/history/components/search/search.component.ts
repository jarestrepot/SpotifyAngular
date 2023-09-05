import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter<any> = new EventEmitter();
  src: string = ''
  ngOnInit(): void {

  }
  callSearch(term: string){
    // if(term.trim().length >= 3){
      this.callbackData.emit(term);
      // console.log(`🤘🏽Podemos hacer uso del servicio HTTP -> ${term}`);
    // }
  }

}
