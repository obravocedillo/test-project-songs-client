import type { ISong } from "./songs";

export interface IGenre {
  id: number;
  name: string;
  songs: ISong[];
}

export interface IGenreSearch {
  name: string;
}

export interface IGenresState {
  genres: IGenre[];
}
