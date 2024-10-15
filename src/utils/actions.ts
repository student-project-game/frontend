import { JoinMatch, KillTroop, UpdateTroop } from "./game/troops"
import { generateId } from "./helpers"
import type { Action } from "./types"
import { get, writable, type Writable } from "svelte/store"

export let id = writable("home") 
export let player_id = generateId()  
export let waiting = writable(true)
export let direction = writable("")

export function MatchSocket(body: string): WebSocket {
  let b = JSON.parse(body) 
  id.set(b.id)
  direction.set(b.direction)
  let socket = new WebSocket(`ws://localhost:12345/games/${get(id)}`, player_id)

  socket.addEventListener("message", (message) => {
    let action: Action = JSON.parse(message.data)
    switch (action.name) {
      case "match_started":
	waiting.set(false)
	JoinMatch(action.body)
        break;
      case "troop":
	UpdateTroop(action.body)
	break;
      case "death":
	KillTroop(action.body)
	break;
      default:
        break;
    }
  })

  socket.addEventListener("close", () => {
    id.set("home")
    waiting.set(true)
  })
  return socket
}
