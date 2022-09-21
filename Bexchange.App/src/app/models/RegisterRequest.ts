import { AddressInfo } from './AddressInfo';

export interface RegisterRequest {
    userName: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;   
    addressInfo: AddressInfo | null | undefined;
    password: string | null | undefined;
}