export interface RequestUpdateUserModel {
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    address?: string;
    phone?: string;
    role_id?: string;
    profile_picture?: string;
    updated_at?: string;
    updated_by: string;
}