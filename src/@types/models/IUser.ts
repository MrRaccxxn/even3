export type IUser = {
    address: string;
    email?: string;
    nickName?: string;
}

export interface IIUserModel extends IUser {
    id: string;
}

export interface IUserFilters {
    id?: string;
    address?: string;
}