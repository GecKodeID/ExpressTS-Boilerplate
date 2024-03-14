import { UserItem } from "./UserItem.model";

export interface ResponseListUser {
    page?: number,
    limit?: number,
    total?: number,
    order?: string,
    order_by?: string,
    items?: UserItem[]
}