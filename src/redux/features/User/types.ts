export interface IUser {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string
    token: string,
    refreshToken: string,
    expiresAt: string
}