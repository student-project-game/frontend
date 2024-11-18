import { writable } from "svelte/store";

export let timer = writable(60000)
export let elixir = writable(0)

export function Countdown(body: string) {
  let t = JSON.parse(body)
  timer.set(t.timer)
}

export function Elixir(body: string) {
  let e = JSON.parse(body)
  elixir.set(e.elixir)
}
