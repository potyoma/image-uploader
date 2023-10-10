export interface Pic {
  src: string;
  alt: string;
  comment?: string;
  date: string;
}

export interface Pics {
  date: string;
  pics: Pic[];
}

export const PICS: Pics[] = [
  {
    date: "August '23",
    pics: [200, 300, 400, 500, 200].map(width => ({
      src: `https://picsum.photos/${width}/200`,
      alt: "Picsum pic",
      comment: width === 200 ? undefined : `width: ${width}`,
      date: "08.08.2023",
    })),
  },
  {
    date: "July '23",
    pics: [200, 300, 800, 200].map(width => ({
      src: `https://picsum.photos/${width}/200`,
      alt: "Picsum pic",
      comment: width === 200 ? undefined : `width: ${width}`,
      date: "07.07.2023",
    })),
  },
];
