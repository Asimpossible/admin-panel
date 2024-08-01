
export interface ILogin {
    user: IUser
    token: string,
    refreshToken: string,
    expiresAt: string
}

export interface IUser {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}