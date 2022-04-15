import { useCallback } from "react"

export const useTitle = () => {
    const rename = useCallback((value: string) => {
        document.title = value
    }, [])

    return {
        rename
    }
}