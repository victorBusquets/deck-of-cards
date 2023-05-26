import { environment } from "@environment";

export const API_ROUTES_FRAGMENTS = {
    add: '/add',
    draw: '/draw',
    list: '/list',
    new: '/new',
    pile: '/pile',
    shuffle: '/shuffle',
}

export const API_ROUTES = {
    base: environment.apiUrl,
    generateDeck: `${environment.apiUrl}${API_ROUTES_FRAGMENTS.new}${API_ROUTES_FRAGMENTS.shuffle}`
}