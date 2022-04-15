import axios from 'axios'

// services
import { MainService } from './MainService'

export class ContactsService extends MainService {
    async fetchContacts() {
        return axios.get(`${this.mainUrl}/contacts`)
    }

    async addContact(data: Record<string, string>) {
        return axios.post(`${this.mainUrl}/contacts`, data)
    }

    async editContact(id: number, data: Record<string, string>) {
        return axios.put(`${this.mainUrl}/contacts/${id}`, data)
    }

    async deleteContact(id: number) {
        return axios.delete(`${this.mainUrl}/contacts/${id}`)
    }
}