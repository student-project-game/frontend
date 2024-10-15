import { get, writable, type Writable } from "svelte/store"
import type { Troop } from "../types"

export let troops: Writable<{[key: string]:Troop}> = writable({})

export function UpdateTroop(body: string) {
  let troop: Troop = JSON.parse(body).troop

  troops.update((m) => {
    m[troop.ID] = troop;
    return m
  })
}

export function KillTroop(body: string) {
  let troop: string = JSON.parse(body).troop
  troops.update((m) => {
    m[troop] = m[troop]
    delete m[troop]
    return m
  })
}

export function JoinMatch(body: string) {
  let maps = JSON.parse(body)
  if (maps.troops) {
    troops.set(maps.troops)
  }
}
