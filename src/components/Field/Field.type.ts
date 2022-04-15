import { SyntheticEvent } from "react"

export interface IField {
    label: string
    onChange: (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}