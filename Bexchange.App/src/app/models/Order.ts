import { Book } from "./Book";

export interface Order {
    firstBook: Book | null | undefined;
    secondBook: Book | null | undefined;
    firstBookId: number | null | undefined;
    secondBookId: number | null | undefined;
}