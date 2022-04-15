import axios from 'axios'

// services
import { MainService } from './MainService'

export class AuthService extends MainService {
    async login(data: Record<string, string>) {
        return axios.get(`${this.mainUrl}/users??email=${data.email}&password=${data.password}`)
    }

    async register(data: Record<string, string>) {
        return axios.post(`${this.mainUrl}/users`, data)
    }
}