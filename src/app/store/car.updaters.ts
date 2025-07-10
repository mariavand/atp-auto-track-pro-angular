import { CarSlice } from "./car.slice";
import { PartialStateUpdater } from "@ngrx/signals";

export function setSearchWord(searchWord: string): PartialStateUpdater<CarSlice>{
  return _ => ({ searchWord })
}
