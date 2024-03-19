export interface RequestAddUserModel {
    username: string;
    email: string;
    password: string;
    name: string;
    address?: string;
    phone: string;
    role_id: string;
    profile_picture?: string;
    created_at?: string;
    created_by?: string;
}