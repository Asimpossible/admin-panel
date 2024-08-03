export interface IUsersData {
    data: IUsers[],
    totalCount: number
}

export interface IUsers {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    isActive?: boolean
}

export interface ISendUser {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    confirmPassword: string
}