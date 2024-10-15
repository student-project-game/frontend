<script lang="ts">
    import { onMount } from "svelte";
  import Button from "../../lib/components/Button/index.svelte"
    import { fly } from "svelte/transition";
  export let match: WebSocket;

  function onCancel() {
    match.close()
  }

  let dots = "..."

  onMount(() => {
    setInterval(() => {
      if (dots.length === 3) {
        dots = ""
        return
      }
      dots += "."
    }, 500)
  })
</script>


<div in:fly={{duration:500}} class="grid justify-center items-center w-[100vw] h-fit gap-[2vh]">
  <p class="font-bold text-center">Waiting for oponent<span class="{dots.length >= 1 ? 'opacity-100' : 'opacity-0'} duration-500">.</span><span class="{dots.length >= 2 ? 'opacity-100' : 'opacity-0'} duration-500">.</span><span class="{dots.length >= 3 ? 'opacity-100' : 'opacity-0'} duration-500">.</span>
  </p>
  <Button mainColour={"red-500"} onClick={onCancel} text={"Cancel"}/> 
</div>
