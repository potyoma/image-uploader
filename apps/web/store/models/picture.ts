export interface Picture {
  id: string;
  src: string;
  alt: string;
  date: string;
  comment?: string;
  loading?: boolean;
  loadProgress?: number;
  size?: number;
}

export interface Pictures {
  month: number;
  year: number;
  pictures: Picture[];
}
