import axios from 'axios'

// services
import { MainService } from './MainService'

export class UsersService extends MainService {
    async getById(token: string) {
        return axios.get(`${this.mainUrl}/users?token=${token}`)
    }
}