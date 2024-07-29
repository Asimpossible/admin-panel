export interface ISendPartner {
    name: string
    contactFirstName: string
    contactLastName: string
    phoneNum: number
    email: string
    city?: ICityData
}

export interface IPartner {
    data: IGetPartner[],
    totalCount: 0
}

export interface IGetPartner {
    id: number
    name: string
    contactPerson: string
    phoneNumber: string
    email: string
    filePath: File | null
    isActive: boolean
    cities: ICityData[]
}

export interface ICityData {
    chooseCity: string
    address: string
    latitude: string
    langitude: string
}