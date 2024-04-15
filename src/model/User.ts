import { Role } from "./Role";
export type User = {
    id: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    avatar: string;
    role: Role;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}