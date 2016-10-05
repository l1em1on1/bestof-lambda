import { Group } from "./group"

export interface Profile {
    name: string,
    email: string,
    groups: Group[]
}