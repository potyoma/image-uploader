// import type { Picture, Pictures } from "./models/picture";
// import moment from "moment";
// import { DATE_FORMAT } from "@web/consts";
// import { nanoid } from "nanoid";
// import { loadImage } from "@web/lib/service";

// const STAB_SEED: Pictures[] = [
//   {
//     id: nanoid(),
//     year: 2023,
//     month: 8,
//     pictures: [200, 300, 400, 500, 200].map(width => ({
//       id: nanoid(),
//       src: `https://picsum.photos/${width}/200`,
//       alt: "Picsum pic",
//       comment: width === 200 ? undefined : `width: ${width}`,
//       date: `${width === 200 ? "08" : "13"}.08.2023`,
//     })),
//   },
//   {
//     id: nanoid(),
//     month: 7,
//     year: 2023,
//     pictures: [200, 300, 800, 200].map(width => ({
//       id: nanoid(),
//       src: `https://picsum.photos/${width}/200`,
//       alt: "Picsum pic",
//       comment: width === 200 ? undefined : `width: ${width}`,
//       date: `${width === 200 ? "07" : "14"}.07.2023`,
//     })),
//   },
// ];

// export class ImageKeeperStore {
//   pictures: Pictures[];
//   notifications: Notification[];
//   loadQueue: Picture[];

//   constructor(initial: Pictures[] = STAB_SEED) {
//     this.pictures = initial;
//     this.notifications = [];
//     this.loadQueue = [];
//     this.sortPictures();
//     makeAutoObservable(this, {}, { autoBind: true });

//     reaction(() => this.loadQueue, this.uploadQueue);
//     reaction(() => this.notifications, this.setNotificationTimer);
//   }

//   private uploadQueue(queue: Picture[]) {
//     const toUpload = queue.filter(q => !q.loading);
//     toUpload.forEach(elem => {
//       this.setLoading(elem.id!);
//       loadImage(
//         elem,
//         kb => this.updateLoadingImage(elem.id!, kb),
//         () => this.finishLoading(elem.id!)
//       );
//     });
//   }

//   @action setLoading(id: string) {
//     const findIndex = this.loadQueue.findIndex(elem => elem.id === id);
//     this.loadQueue[findIndex].loading = true;
//   }

//   @observable findPictureById(id: string) {
//     for (let picture of this.pictures) {
//       const res = picture.pictures.find(elem => elem.id === id);
//       if (res) return { chunkId: picture.id, picture: res };
//     }
//   }

//   @action finishLoading(id: string) {
//     const elemIndex = this.loadQueue.findIndex(el => el.id === id);
//     this.loadQueue.splice(elemIndex, 1);
//     const finalElemId = this.pictures[0].pictures.findIndex(el => el.id === id);
//     this.pictures[0].pictures[finalElemId].loading = false;
//   }

//   @action updateLoadingImage(id: string, loadProgress: number) {
//     const imageIndex = this.loadQueue.findIndex(lq => lq.id === id);
//     this.loadQueue[imageIndex].loadProgress = loadProgress;
//   }

//   @observable getLoadingQueueImage(id: string) {
//     return this.loadQueue.find(el => el.id === id);
//   }

//   @observable get countPictures() {
//     return this.pictures.reduce(
//       (acc: number, next: Pictures) => acc + next.pictures.length,
//       0
//     );
//   }

//   @action private sortPictures() {
//     this.pictures
//       .sort((a, b) =>
//         moment(`${a.year}.${a.month}`, "YYYY.MM").isBefore(
//           moment(`${b.year}.${b.month}`, "YYYY.MM")
//         )
//           ? 1
//           : -1
//       )
//       .forEach(arr =>
//         arr.pictures.sort((a, b) =>
//           moment(a.date, DATE_FORMAT).isBefore(moment(b.date, DATE_FORMAT))
//             ? 1
//             : -1
//         )
//       );
//   }

//   @action updateImageById(
//     chunkId: string,
//     id: string,
//     property: keyof Picture,
//     value: never
//   ) {
//     const chunkIndex = this.pictures.findIndex(val => val.id === chunkId);

//     const imageIndex = this.pictures[chunkIndex].pictures.findIndex(
//       val => val.id === id
//     );

//     this.pictures[chunkIndex].pictures[imageIndex][property] = value;
//     console.log(chunkIndex, imageIndex, property, value);
//     console.log(this.pictures[chunkIndex].pictures[imageIndex][property]);
//   }

//   @action addPictures(pictures: Picture[]) {
//     pictures.forEach(p => (p.id = nanoid()));
//     const date = moment(pictures[0].date, DATE_FORMAT);
//     let chunkIndexByDate = this.pictures.findIndex(
//       pictures =>
//         pictures?.month === date.month() && pictures?.year === date.year()
//     );

//     if (chunkIndexByDate < 0) {
//       const now = moment();
//       chunkIndexByDate =
//         this.pictures.push({
//           id: nanoid(),
//           year: now.year(),
//           month: now.month(),
//           pictures: pictures,
//         }) - 1;
//     } else {
//       this.pictures[chunkIndexByDate].pictures.push(...pictures);
//     }

//     console.log(pictures);
//     this.loadQueue.push(...pictures);
//     console.log(this.loadQueue);

//     this.sortPictures();
//   }

//   private setNotificationTimer(timer = 4000) {
//     setTimeout(() => this.notifications.shift(), timer);
//   }

//   @action addNotification(notification: Notification) {
//     this.notifications.push(notification);
//   }
// }
