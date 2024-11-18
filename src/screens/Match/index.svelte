<script lang="ts">
  import {selectedCard, troops} from "../../utils/game/troops"
  import {player_id, direction} from "../../utils/actions"
  import { onMount } from "svelte";
  import Troop from "./Troop/index.svelte"
  import Card from "./Card/index.svelte"
  import { number } from "mathjs";
  import { fly } from "svelte/transition";
    import { elixir, timer } from "../../utils/game/game";
    import { CARDS } from "../../utils/cards";

  export let match: WebSocket;

  function onPlace(i: number, j: number) {
    let y = i 
    if ($direction === "up") {
      y = 32 - i
    }

    match.send(JSON.stringify({name: "place", body: JSON.stringify({name: $selectedCard.Name, tile: {x: j, y: y}})}))
  }

  let startX = 0;
  let startY = 0;
  let width = 0;
  let height = 0;


  function Resize() {
    let e = window.document.getElementById('arena')?.getBoundingClientRect();
    // @ts-ignore
    startX = e.left;

    // @ts-ignore
    startY = e.y;

    // @ts-ignore
    width = e.width;

    // @ts-ignore
    height = e.height;
  }

  onMount(() => {
    Resize();
    window.addEventListener('resize', Resize);
  });

  let time: string = "3:00"
  timer.subscribe((t) => {
    let minutes = Math.floor((t/1000)/60)
    let seconds = (t/1000) - minutes*60
    time = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }) 
</script>

<div transition:fly={{duration: 500}} id="arena" class="grid">
  {#each {length: 32} as _, i}
    <div class="flex">
      {#each {length: 18} as _, j}
	  <button on:click={() => {
	    onPlace(i, j)
	  }} class={`bg-gray-300 hover:bg-gray-500 border-black border-[1px] w-[20px] h-[20px] z-[50]`}></button>
      {/each}
    </div>
  {/each}
</div>

<div class="w-[100vw] h-[100vh] absolute">
  <div class="grid absolute items-center px-2 gap-2 bottom-0 right-0 z-[500]">
    <div class="flex gap-2">
      {#each CARDS as card}
	<Card card={card[1]}/>
      {/each}
    </div>
    <div class="flex justify-between items-center">
      <p class="">Elixir: {$elixir}</p>
      <p class="">Timer: {time}</p>
    </div>
  </div>
</div>

<div transition:fly={{duration: 500}} class="absolute w-[100vw] h-[100vh]">
  {#each Object.values($troops) as troop (troop)}
    <Troop bind:troop bind:startX bind:startY/> 
  {/each}
</div>
