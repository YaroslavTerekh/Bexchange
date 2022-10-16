export interface OrderRequest {
    id: number;
    firstBookId: number | null | undefined;
    secondBookId: number | null | undefined;
}