export enum Status {
    Online = "Online",
    Offline = "Offline",
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    status?: Status;
}