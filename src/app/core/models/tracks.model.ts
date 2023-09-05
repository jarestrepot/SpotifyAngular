import { ArtistModel } from "./artist.model";

export interface TrackModel {
  _id: number | string;
  name: string;
  album: string;
  cover: string;
  artist?: ArtistModel;
  duration?: durationSong;
  url: string;
  gender?: string;
}


interface durationSong {
  start: number;
  end: number;
}
