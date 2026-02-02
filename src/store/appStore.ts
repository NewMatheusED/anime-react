import { Store, useStore } from '@tanstack/react-store'

const FAVORITES_KEY = 'favorites'

function loadFavorites(): number[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x): x is number => typeof x === 'number') : []
  } catch {
    return []
  }
}

function saveFavorites(ids: number[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
}

export interface AppState {
  search: string
  favorites: number[]
}

export const appStore = new Store<AppState>({
  search: '',
  favorites: loadFavorites(),
})

appStore.subscribe(() => {
  saveFavorites(appStore.state.favorites)
})

export function setSearch(value: string): void {
  appStore.setState((state) => ({ ...state, search: value }))
}

export function setFavorites(updater: (prev: number[]) => number[]): void {
  appStore.setState((state) => ({ ...state, favorites: updater(state.favorites) }))
}

export function useSearch(): string {
  return useStore(appStore, (state) => state.search)
}

export function useSetSearch(): (value: string) => void {
  return setSearch
}

export function useFavorites(): number[] {
  return useStore(appStore, (state) => state.favorites)
}

export function useSetFavorites(): (updater: (prev: number[]) => number[]) => void {
  return setFavorites
}

export function useFavorite(): { favorites: number[]; setFavorites: (updater: (prev: number[]) => number[]) => void } {
  const favorites = useStore(appStore, (state) => state.favorites)
  return { favorites, setFavorites }
}
