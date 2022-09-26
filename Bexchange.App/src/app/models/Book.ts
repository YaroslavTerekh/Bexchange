import { Genre } from './Genre';
import { Author } from './Author';
import { Image } from 'src/app/models/Image';

export interface Book {
    userId: number;
    id: number;
    title: string | undefined;
    description: string | undefined;
    genre: Genre | undefined;
    author: Author | undefined;
    image: Image | undefined;
    comments: string[] | null | undefined;
}