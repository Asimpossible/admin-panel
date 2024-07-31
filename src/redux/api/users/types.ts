export interface IUsersData {
    data: IUsers[],
    totalCount: number
}

export interface IUsers {
    firstName: string
    lastName: string
    email: string
    phone: string
    isActive: boolean
    tools?: IUsersTools
}

export interface IUsersTools {
    view: boolean
    edit: boolean
    changePassword: boolean
    delete: boolean
}
export interface ISendUser {
    firstname: string
    lastname: string
    email: string
    phoneNum: string
    password: string
    confirmPassword: string
}