<script lang="ts">
  import { tweened, type Tweened } from "svelte/motion";
  import type { Tile, Troop } from "../../../utils/types";
  import { linear } from "svelte/easing";
  import { player_id, direction } from "../../../utils/actions";
  import { troops } from "../../../utils/game/troops";
  export let troop: Troop;
  export let startX: number;
  export let startY: number;

  if ($direction == "up") {
    troop.Tile.y = 32 - troop.Tile.y;
    troop.NextTile.y = 32 - troop.NextTile.y;
  }

  let position: Tweened<Tile> = tweened(
    { x: troop.Tile.x * 20, y: troop.Tile.y * 20 },
    { duration: troop.MovementSpeed, easing: linear },
  );

  let frame: Tweened<number> = tweened(1, {
    duration:
      troop.State === "moving"
        ? troop.MovementSpeed / 2
        : troop.AttackSpeed / 2,
    easing: linear,
  });

  frame.set(18);

  setTimeout(() => {
    frame.set(1);
  }, troop.MovementSpeed / 2);

  position.set({ x: troop.NextTile.x * 20, y: troop.NextTile.y * 20 });

  let angle = Math.atan2(
    troop.NextTile.x - troop.Tile.x,
    troop.Tile.y - troop.NextTile.y,
  );

  if (troop.State === "attacking" && $troops[troop.Lock]) {
    angle = Math.atan2(
      $troops[troop.Lock].Tile.x - troop.Tile.x,
      troop.Tile.y - $troops[troop.Lock].Tile.y,
    );
  }

  if (troop.Type != "building") {
    console.log(troop);
  }
</script>

{#if troop.HP > 0 || troop.Team == "" || troop.Type === "projectile"}
  <div
    class="absolute {troop.Name === 'water'
      ? 'bg-blue-400'
      : ''} w-[20px] h-[20px] z-[100] grid justify-start"
    style:top={`${startY + $position.y}px`}
    style:left={`${startX + $position.x}px`}
    style={`transform: rotate(${angle}rad);`}
  >
    {#if troop.Name === "water"}
      <div class="bg-blue-500 w-full h-full"></div>
    {:else if troop.Name === "tower"}
      <div class="bg-blue-500 w-full h-full"></div>
    {:else if troop.Type === "projectile"}
      <img
        src={`/${troop.Name}/0.png`}
        class="absolute top-[-10px]"
        alt=""
        width="full"
      />
    {:else}
      <img
        src={`/${troop.Name}/${troop.State === "moving" ? "Walk" : "Attack"}/${Math.ceil($frame)}.png`}
        class="absolute top-[-10px] scale-[300%]"
        alt=""
        width="full"
      />
    {/if}
  </div>

  <div
    class="{troop.Team === ''
      ? 'hidden'
      : ''} text-center absolute z-[91] w-[60px] text-black h-[20px] mt-[10px] border-[1px] {troop.Team ==
    $direction
      ? 'bg-blue-300 border-blue-500'
      : 'bg-red-300 border-red-500'}"
    style:top={`${startY + ($position.y + 20)}px`}
    style:left={`${startX + ($position.x - 20)}px`}
  >
    {troop.HP / (troop.MaxHP / 100)}%
  </div>

  <!-- <div class="absolute z-[90] border-[1px] {troop.Team == player_id ? 'bg-blue-300 border-blue-500' : 'bg-red-300 border-red-500'}"  -->
  <!--   style:top={`${startY + ($position.y - (troop.Splash * 20))}px`} style:left={`${startX + ($position.x - (troop.Splash * 20))}px`} -->
  <!--   style:width={`${((troop.Splash * 2)+1) * 20}px`} -->
  <!--   style:height={`${((troop.Splash * 2)+1) * 20}px`} -->
  <!-- > -->
  <!-- </div> -->
{/if}
