import { Image } from 'src/app/shared/models/Image';
import { Author } from "src/app/shared/models/Author";

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