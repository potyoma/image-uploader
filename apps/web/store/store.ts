import { action, computed, observable } from "mobx";
import type { Picture, Pictures } from "./models/picture";
import moment from "moment";
import { DATE_FORMAT } from "@web/consts";
import { nanoid } from "nanoid";

const STAB_SEED: Pictures[] = [
  {
    year: 2023,
    month: 8,
    pictures: [200, 300, 400, 500, 200].map(width => ({
      id: nanoid(),
      src: `https://picsum.photos/${width}/200`,
      alt: "Picsum pic",
      comment: width === 200 ? undefined : `width: ${width}`,
      date: `${width === 200 ? "08" : "13"}.08.2023`,
    })),
  },
  {
    month: 7,
    year: 2023,
    pictures: [200, 300, 800, 200].map(width => ({
      id: nanoid(),
      src: `https://picsum.photos/${width}/200`,
      alt: "Picsum pic",
      comment: width === 200 ? undefined : `width: ${width}`,
      date: `${width === 200 ? "07" : "14"}.07.2023`,
    })),
  },
];

export class ImageKeeperStore {
  @observable pictures: Pictures[];
  @observable notifications: Notification[];

  constructor() {
    this.pictures = STAB_SEED;
    this.notifications = [];
    this.sortPictures();
  }

  @computed get countPictures() {
    return this.pictures.reduce(
      (acc: number, next: Pictures) => acc + next.pictures.length,
      0
    );
  }

  private sortPictures() {
    this.pictures
      .sort((a, b) =>
        moment(`${a.year}.${a.month}`, "YYYY.MM").isBefore(
          moment(`${b.year}.${b.month}`, "YYYY.MM")
        )
          ? 1
          : -1
      )
      .forEach(arr =>
        arr.pictures.sort((a, b) =>
          moment(a.date, DATE_FORMAT).isBefore(moment(b.date, DATE_FORMAT))
            ? 1
            : -1
        )
      );
  }

  @action addPicture(picture: Picture) {
    const date = moment(picture.date, DATE_FORMAT);
    const chunkIndexByDate = this.pictures.findIndex(
      pictures =>
        pictures.month === date.month() && pictures.year === date.year()
    );

    if (chunkIndexByDate < 0) {
      const now = moment();
      this.pictures.push({
        year: now.year(),
        month: now.month(),
        pictures: [picture],
      });
      this.sortPictures();
      return;
    }

    this.pictures[chunkIndexByDate].pictures.push(picture);
    this.sortPictures();
  }

  private setNotificationTimer(timer = 4000) {
    setTimeout(() => this.notifications.shift(), timer);
  }

  @action addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.setNotificationTimer();
  }
}
