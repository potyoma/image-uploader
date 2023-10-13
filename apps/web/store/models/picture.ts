export interface Picture {
  id?: string;
  src: string;
  alt: string;
  date: string;
  comment?: string;
  loading?: boolean;
  loadProgress?: number;
  size?: number;
  blob?: Blob;
}

export interface Pictures {
  id: string;
  month: number;
  year: number;
  pictures: Picture[];
}
