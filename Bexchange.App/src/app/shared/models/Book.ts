import { Image } from 'src/app/shared/models/Image';
import { Author } from "./Author";
import { Genre } from "./Genre";

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