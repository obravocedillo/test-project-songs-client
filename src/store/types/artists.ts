import type { ISong } from "./songs";

export interface IArtist {
  id: number;
  name: string;
  songs: ISong[];
}

export interface IArtistsState {
  artists: IArtist[];
}
