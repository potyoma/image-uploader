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
  deleteTimeout?: NodeJS.Timeout;
}

export type Pictures = Record<string, Picture[]>;
