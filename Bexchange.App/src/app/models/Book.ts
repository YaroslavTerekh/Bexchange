import { Image } from 'src/app/models/Image';

export interface Book {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    genre: string | undefined;
    author: string | undefined;
    image: Image | undefined;
}