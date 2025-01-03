export interface BookCreate {
  title: string;
  author: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  imageURL?: string;
}

export interface BookDelete {
  id: number;
}
