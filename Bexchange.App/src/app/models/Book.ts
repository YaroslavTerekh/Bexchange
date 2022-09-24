import { Genre } from './Genre';
import { Author } from './Author';
import { Image } from 'src/app/models/Image';

export interface Book {
    id: number | undefined;
    title: string | undefined;
    description: string | undefined;
    genre: Genre | undefined;
    author: Author | undefined;
    image: Image | undefined;
}