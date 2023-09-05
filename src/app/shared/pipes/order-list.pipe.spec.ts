import { TrackModel } from '@core/models/tracks.model';
import { OrderListPipe } from './order-list.pipe';
import * as mockData from '@data/tracks.json';

describe('PIPE OrderList', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Return data', () => {
    // Arrage
    const pipe = new OrderListPipe();
    const { data }: any = (mockData as any).default;

    // Act
    const result:TrackModel[] = pipe.transform(data)
    // Assert
    expect(result).toEqual(data);
  });


  it('Probar si se ordena de manera ASC', () => {
    // Arrage
    const pipe = new OrderListPipe();
    const { data }: any = (mockData as any).default;
    const firstTrack = data.find((track:any) => track._id === 7);
    const lastTrack = data.find((track: any) => track._id === 6);
    // Act
    const result: TrackModel[] = pipe.transform(data,'name', 'asc')
    const firstResult = result[0];
    const lastResult = result[result.length - 1];

    // Assert
    expect(firstResult).toEqual(firstTrack);
    expect(lastResult).toEqual(lastTrack);

  });
});
