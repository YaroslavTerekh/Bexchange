// import { State } from './StateDictionary';
import { Genre } from './Genre';
import { Author } from './Author';
import { Image } from 'src/app/models/Image';

export interface Book {
    userId: number;
    id: number;
    state: number | undefined;
    title: string | undefined;
    description: string | undefined;
    genre: Genre | undefined;
    author: Author | undefined;
    image: Image | undefined | null;
    comments: string[] | null | undefined;
}