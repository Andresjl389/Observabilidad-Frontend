import { UUID } from "crypto"
import { Types } from "./types"

export interface InfoUpdate {
    id: UUID
    type_id: Types
    title: string
    description: string
    icon: string
    link: string
    filename: string
    filepath: string
}