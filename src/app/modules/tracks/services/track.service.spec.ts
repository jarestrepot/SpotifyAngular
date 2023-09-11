import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TrackService } from './track.service';
import * as mockData from '@data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be get all tracks', () => {

    const { data }: any = (mockData as any).default;

    service.getAllTracks$().subscribe(
      {
        next: (response:TrackModel[] ) =>{
          expect(response).toEqual(data)
        },
        error: (error:Error ) =>{
          // Alert Error
        }
      }
    )
    // expect(service.getAllTracks$).toEqual(data);
  });



});
