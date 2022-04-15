import { useCallback } from 'react'

export const useLocaleStorage = (name: string) => {
    const get = useCallback(() => {
        return localStorage.getItem(name)
    }, [])

    const set = useCallback((data: string) => {
        return localStorage.setItem(name, data)
    }, [])

    const remove = useCallback(() => {
        return localStorage.removeItem(name)
    }, [])

    return {
        get,
        set,
        remove,
        value: get()
    }
}