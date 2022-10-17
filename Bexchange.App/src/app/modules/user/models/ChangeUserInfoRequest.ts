import { AddressInfo } from "src/app/shared/models/AddressInfo";

export interface ChangeUserInfoRequest {
    id: number | null | undefined;
    userName: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;   
    address: AddressInfo | null | undefined;
}