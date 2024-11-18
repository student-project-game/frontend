<script lang="ts">
  import type { Action } from "../utils/types";
  import { MatchSocket, id, waiting, player_id } from "../utils/actions";
  import Home from "../screens/Home/index.svelte"
  import Waiting from "../screens/Waiting/index.svelte"
  import Match from "../screens/Match/index.svelte"

  let socket = new WebSocket("ws://localhost:12345/home", player_id)
  let match: WebSocket;

  socket.addEventListener("message", (message) => {
    let action: Action = JSON.parse(message.data)
    switch (action.name) {
      case "game_id":
        match = MatchSocket(action.body)
        break;

      default:
        break;
    }
  })


  function onPlace() {
    match.send(JSON.stringify({name: "place", body: JSON.stringify({name: "wizard", tile: [4, 2]})}))
  }

</script>

<div class="absolute top-0 w-[100vw] h-[10vh] flex justify-between py-[1vh] px-[1vw]">
  <p class="text-md font-bold">Player: {player_id}</p>

  <p class="text-md font-bold">ID: {$id}</p>
</div>

<div class="w-[100vw] h-[100vh] grid justify-center items-center">
  {#if $id === "home"}
    <Home bind:socket/>
  {:else if $id != "home" && $waiting}
    <Waiting bind:match/>
  {:else}
    <Match bind:match/> 
  {/if}
</div>


