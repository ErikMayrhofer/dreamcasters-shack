export interface Entity {
  id: string;
}
export interface Artwork extends Entity {
  name: string;
  price: number;
  title_image: string;
  gallery: {
    directus_files_id: string;
  }[];
}
