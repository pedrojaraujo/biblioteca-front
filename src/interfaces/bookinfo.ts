export interface BookCreate {
  title: string;
  author: string;
}

export interface BookUpdate {
  id: number;
  title: string;
  author: string;
}

export interface BookDelete {
  id: number;
}
