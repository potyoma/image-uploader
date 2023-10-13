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

export type Pictures = Record<string, Picture[]>;
