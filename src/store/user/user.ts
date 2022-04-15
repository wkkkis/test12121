//MobX
import { action, makeAutoObservable } from 'mobx'

// interfaces
import { IUser } from './user.type'

//EmptyData
import { EmptyUser } from '../../utils/emptyData'

// services
import { UsersService } from '../../services/UserService'

const service = new UsersService()

export class User {
    data: IUser = EmptyUser
    loaded = false
    hasError = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async getById(id: string) {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.getById(id)

            this.data = res.data[0]
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }
}

export const UserStore = new User()