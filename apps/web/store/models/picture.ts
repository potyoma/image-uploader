export interface Picture {
  id?: string;
  src: string;
  name: string;
  alt: string;
  date?: string;
  comment?: string;
  loading?: boolean;
  loadProgress?: number;
  size?: number;
  blob?: Blob;
  markDelete?: boolean;
}

export type Pictures = Record<string, Picture[]>;
