import { UUID } from "crypto"

export interface Info {
    id: UUID
    user_id: string
    type_id: string
    title: string
    description: string
    icon: string
    link: string
    filename: string
    filepath: string
}