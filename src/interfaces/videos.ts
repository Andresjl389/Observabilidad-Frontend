import { Role } from "./Role"
import { Types } from "./types"
import { Users } from "./Users"

export interface Videos {
    id: string
    title: string
    description: string
    link: string
    user: Users
    type: Types
}