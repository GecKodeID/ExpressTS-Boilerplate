export interface UserItem {
    id?: string;
    username?: string;
    email?: string;
    name?: string;
    address?: string;
    phone?: string;
    profile_picture?: string;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted_at?: string;
    message?: string;
}

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

export interface ResponseListUser {
    page?: number,
    limit?: number,
    total?: number,
    order?: string,
    order_by?: string,
    items?: UserItem[]
}