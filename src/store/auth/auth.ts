//MobX
import { action, makeAutoObservable } from 'mobx'

// services
import { AuthService } from '../../services/AuthService'

//Uuid
//@ts-ignore
import uuid from 'react-uuid'

//Interfaces
import { IAuth } from './auth.type'

const service = new AuthService()

export class Auth {
    redirect: IAuth = false
    loaded = false
    hasError = false

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async login(data: Record<string, string>) {
        this.loaded = false
        this.hasError = false

        try {
            const res = await service.login(data)
            const { 
                token
            } = res.data[0]

            localStorage.setItem("token", token)
            this.redirect = true
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }

    @action
    async register(data: Record<string, string>) {
        this.loaded = false
        this.hasError = false

        const newData = {
            ...data,
            token: uuid()
        }

        try {
            const res = await service.register(newData)
            localStorage.setItem("token", res.data.token)
            this.redirect = true
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }

    @action
    async logout() {
        this.loaded = false
        this.hasError = false

        try {
            localStorage.removeItem("token")
            this.redirect = true
            this.loaded = true
        }
        catch(err) {
            console.log(err)

            this.loaded = true
            this.hasError = true
        }
    }
}

export const AuthStore = new Auth()