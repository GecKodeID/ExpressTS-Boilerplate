export interface TEMPLATEItemModel {
    id?: string;
    name?: string;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    deleted_at?: string;
}

export interface RequestAddTEMPLATEModel {
    id: string;
    name: string;
    created_at?: string;
    created_by: string;
}

export interface RequestUpdateTEMPLATEModel {
    id: string;
    name?: string;
    updated_at?: string;
    updated_by: string;
}