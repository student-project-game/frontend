<script lang="ts">
	import { selectedCard, troops } from "../../utils/game/troops";
	import { player_id, direction } from "../../utils/actions";
	import { onMount } from "svelte";
	import Troop from "./Troop/index.svelte";
	import Card from "./Card/index.svelte";
	import { fly } from "svelte/transition";
	import { elixir, timer } from "../../utils/game/game";
	import { CARDS } from "../../utils/cards";
	import Timer from "../../lib/components/Timer/index.svelte";
	import Water from "svelte-material-icons/Water.svelte";

	export let match: WebSocket;

	function onPlace(i: number, j: number) {
		let y = i;
		if ($direction === "up") {
			y = 32 - i;
		}

		match.send(
			JSON.stringify({
				name: "place",
				body: JSON.stringify({
					name: $selectedCard.Name,
					tile: { x: j, y: y },
				}),
			}),
		);
	}

	let startX = 0;
	let startY = 0;
	let width = 0;
	let height = 0;

	function Resize() {
		let e = window.document
			.getElementById("arena")
			?.getBoundingClientRect();
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
		window.addEventListener("resize", Resize);
	});

	let time: string = "3:00";
	timer.subscribe((t) => {
		let minutes = Math.floor(t / 1000 / 60);
		let seconds = t / 1000 - minutes * 60;
		time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
	});
</script>

<div
	transition:fly={{ duration: 500 }}
	id="arena"
	class="grid absolute z-[10] top-1/2 transform -translate-y-1/2 left-[20vw] rounded-xl"
	style="background-image: url(/map.png); background-size: cover; background-position: center;"
>
	{#each { length: 32 } as _, i}
		<div class="flex">
			{#each { length: 18 } as _, j}
				<button
					on:click={() => {
						onPlace(i, j);
					}}
					class={`bg-transparent hover:bg-gray-500 w-[20px] h-[20px] z-[50]`}
				>
					{#if i === 15 && (j === 4 || j === 13)}
						<div
							class="bg-yellow-900 w-full h-full"
						></div>
					{/if}
				</button>
			{/each}
		</div>
	{/each}
</div>
<div class="flex z-20 w-[100vw] absolute top-3 justify-end items-center">
	<Timer bind:time />
</div>

<div class="w-[100vw] h-[100vh] absolute">
	<div
		class="grid absolute justify-center items-center gap-2 bottom-[3vh] right-[10vw] z-[100]"
	>
		<div
			class="flex gap-2 justify-space-between items-center w-full"
		>
			<div class="flex items-center">
				<Water size="20px" color="violet" />
				<p>{$elixir}</p>
			</div>

			<div
				class="bg-slate-500 h-[20px] duration-500 rounded-xl"
				style:width={`100%`}
			>
				<div
					class="bg-[#EE82EE] h-[20px] duration-500 rounded-xl"
					style:width={`${$elixir * 10}%`}
				></div>
			</div>
		</div>
		<div class="flex gap-2">
			{#each CARDS as card}
				<div class="">
					<Card card={card[1]} />
				</div>
			{/each}
		</div>
	</div>
</div>

<div transition:fly={{ duration: 500 }} class="absolute w-[100vw] h-[100vh]">
	{#each Object.values($troops) as troop (troop)}
		<Troop bind:troop bind:startX bind:startY />
	{/each}
</div>
