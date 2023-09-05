import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<TrackModel>, element: string | null = null, sortElements: string = 'asc') : Array<TrackModel> {
    try{
      if(element === null) return value;

      const tempList = value.sort( (a: any, b: any) => {
        if(a[element] < b[element]) return -1;
        if (a[element] === b[element]) return 0;
        if (a[element] > b[element]) return 1;
        return 1;
      });
      return sortElements === 'asc' ? tempList: tempList.reverse();

    } catch(e){
      console.warn(`⚠️ WARNING: ${e}`);
      return value;
    }
  }
}
