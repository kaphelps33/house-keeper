import type { Item } from "./Item"

export interface Room {
    id: string
    name: string
    items: Item[]
}