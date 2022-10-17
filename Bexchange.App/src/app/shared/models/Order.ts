import { Book } from './Book';

export interface Order {
    id: number;
    firstBookId: number | null | undefined;
    secondBookId: number | null | undefined;
    firstBook: Book | null | undefined;
    secondBook: Book | null | undefined;
    state: number | null | undefined;
}