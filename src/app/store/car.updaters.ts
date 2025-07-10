import { CarSlice } from "./car.slice";
import { PartialStateUpdater } from "@ngrx/signals";

export function setSearchWord(searchWord: string): PartialStateUpdater<CarSlice>{
  console.log('updater', searchWord);
  return _ => ({ searchWord })
}
