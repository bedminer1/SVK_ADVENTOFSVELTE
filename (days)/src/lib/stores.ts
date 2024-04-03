import { writable } from "svelte/store";

export const search = writable('')
export const searchData = writable({})
export const giftStore = writable<Expense[]>([])