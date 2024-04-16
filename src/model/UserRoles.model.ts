export interface UserRolesItem {
    id?: string;
    role_name?: string;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted_at?: string;
}

export interface RequestUpdateRoleModel {
    role_id: string;
    role_name?: string;
    updated_at?: string;
    updated_by: string;
}

export interface RequestAddRoleModel {
    role_name: string;
    created_at?: string;
    created_by: string;
}