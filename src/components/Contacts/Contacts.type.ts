export interface IContactsItem {
    id: number,
    number: number | string,
    name: string
    idx?: number
}

export interface IContactsGrid {
    data: IContactsItem[]
}