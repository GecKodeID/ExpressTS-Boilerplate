export interface RequestLoginModel {
    username?: string;
    email?:string;
    password: string;
}

export interface ResponseLoginModel {
    message?: string;
    token: string;
}