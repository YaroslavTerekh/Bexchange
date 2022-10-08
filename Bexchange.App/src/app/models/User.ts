import { AddressInfo } from './AddressInfo';
import { Book } from './Book';

export interface User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    addressId: number;
    addressInfo: AddressInfo
    books: Book[];
    registeredDate: Date;    
    role: number;

    isBanned: boolean;
}