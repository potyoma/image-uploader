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

function formatDate(date?: string) {
  return moment(date, DATE_FORMAT);
}

function compareDatesDescending(pic1: Picture, pic2: Picture) {
  return formatDate(pic1.date).isBefore(formatDate(pic2.date)) ? 1 : -1;
}

export function sortPictures(pictures: Picture[]): Pictures {
  const sorted = [...pictures].sort(compareDatesDescending);

  const chunked = sorted.reduce((acc, next) => {
    const date = moment(next.date, DATE_FORMAT);
    const codedDate = `${date.month()}.${date.year()}`;

    (acc[codedDate] ??= []).push(next);
    return acc;
  }, {} as Pictures);

  return chunked;
}
