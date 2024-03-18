export interface RequestUpdateUserModel {
    id: string;
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    address?: string;
    phone?: string;
    profile_picture?: string;
    updated_at?: string;
    updated_by: string;
}