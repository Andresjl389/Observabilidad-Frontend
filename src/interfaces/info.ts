import { UUID } from "crypto"

export interface Info {
    id: UUID
    type_id: string
    title: string
    description: string
    icon: string
    link: string
    filename: File | string
    filepath: string
}