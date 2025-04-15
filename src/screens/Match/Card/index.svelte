<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Card } from "../../../utils/types";
  import { selectedCard } from "../../../utils/game/troops";

  export let card: Card;

  function Select() {
    $selectedCard = card;
  }
</script>

<button
  on:click={() => {
    Select();
  }}
  class="relative p-2 hover:scale-[105%] duration-500 rounded-md grid items-center justify-center w-[100px] h-[125px]"
>
  <img
    src={`/Splash/${card.Name}.png`}
    class="
{$selectedCard && $selectedCard.Name === card.Name
      ? 'border-[5px] border-yellow-500 scale-[105%]'
      : 'border-[1px] border-black'}
    absolute top-0 left-0 rounded-md w-[100px] h-[125px]"
    alt=""
  />
  <p class="text-xs absolute bottom-2 right-2">
    {card.Cost} El
  </p>
</button>
