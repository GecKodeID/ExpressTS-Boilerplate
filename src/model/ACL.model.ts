export interface ACLItemModel {
    id?: string;
    role_id?: string;
    name?: string;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted_at?: string;
}

export interface RequestAddACLModel {
    role_id: string;
    name: string;
    created_at?: string;
    created_by: string;
}

export interface RequestUpdateACLModel {
    acl_id: string;
    role_id?: string;
    name?: string;
    updated_at?: string;
    updated_by: string;
}