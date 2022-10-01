import { Genre } from './Genre';
import { Author } from './Author';
import { Image } from 'src/app/models/Image';

export interface BookRequest {
    userId: number;
    id: number;
    title: string | undefined;
    description: string | undefined;
    genreId: number | null;
    author: Author | undefined;
    image: Image | undefined | null;
    comments: string[] | null | undefined;
}