import moment from "moment";
import { Picture, Pictures } from "./models/picture";
import { DATE_FORMAT } from "@web/consts";

export function findIndexById(arr: Picture[], id: string) {
  return arr.findIndex(pic => pic.id === id);
}

export function removeFromArrayById(arr: Picture[], id: string) {
  const index = findIndexById(arr, id);
  arr.splice(index, 1);
}

export function chunkPictures(pictures: Picture[]): Pictures {
  const chunked = pictures.reduce((acc, next) => {
    const date = moment(next.date, DATE_FORMAT);
    const codedDate = `${date.month()}.${date.year()}`;

    (acc[codedDate] ??= []).push(next);
    return acc;
  }, {} as Pictures);

  return chunked;
}
