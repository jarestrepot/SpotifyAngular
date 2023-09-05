export interface ApiTracks {
  data: TrackModelApi[];
}

export interface TrackModelApi {
  _id: number;
  album: string;
  artist: Artist;
  cover: string;
  duration: Duration;
  name: string;
  url: string;
  gender?: string;
}

export interface Artist {
  name: string;
  nationality: string;
  nickname: string;
}

export interface Duration {
  end: number;
  start: number;
}

