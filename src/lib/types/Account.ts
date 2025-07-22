export interface Account {
    id: string,
    username: string,
    email: string,
    createdAt: string,
    verify: boolean,
    role: number,
    activate: boolean
}