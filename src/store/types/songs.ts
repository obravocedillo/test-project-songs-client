import type { IArtist } from "./artists";
import type { IGenre } from "./genres";

export interface ISong {
  id: number;
  title: string;
  duration: number;
  artist: IArtist[];
  genreId: number;
  genre: IGenre;
}

export interface ISongsState {
  songs: ISong[];
}
