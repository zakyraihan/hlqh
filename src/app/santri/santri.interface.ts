export interface Santri {
  id: number;
  nama: string;
}

export interface Musrif {
  musrif: string;
  santri: Santri[];
}
