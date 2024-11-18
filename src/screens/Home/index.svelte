<script lang="ts">
  import { fly } from "svelte/transition";
  import Button from "../../lib/components/Button/index.svelte"
  export let socket: WebSocket;

  function onJoin() {
    socket.send(JSON.stringify({name: "join", body: JSON.stringify({playerCount: 2})}))
  }
</script>

<div in:fly={{duration: 500}} class="grid justify-center items-center w-[100vw] h-[100vh]">
  <Button mainColour={"yellow-400"} onClick={onJoin} text={"Battle"}/>
</div>
