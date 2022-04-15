//MobX
import { action, makeAutoObservable } from 'mobx'

// services
import { ContactsService } from '../../services/ContactsService'

//Interfaces
import { IContacts } from './contacts.type'

const service = new ContactsService()

export class Contacts {
    data: IContacts[] = []
    loaded = false
    hasError = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async fetchContacts() {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.fetchContacts()
            this.data = res.data
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }

    @action
    async addContact(data: Record<string, string>) {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.addContact(data)
            this.data = res.data
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }

    @action
    async editContact(id: number, data: Record<string, string>) {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.editContact(id, data)
            this.data = res.data
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }

    @action
    async deleteContact(id: number) {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.deleteContact(id)
            this.data = [...this.data].filter((i) => i.id !== id)
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }
}

export const ContactsStore = new Contacts()