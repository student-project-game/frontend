<script lang="ts">
  export let onClick = () => {} 
  export let text = ""
  
  export let mainColour = ""
</script>

<div class="hidden bg-yellow-400 bg-red-500"></div>

<button 
  on:click={onClick} 
  class="text-xl hover:scale-[1.1] z-[50] duration-500 bg-{mainColour} rounded-md shadow-xl text-white px-[15px] py-[3vh] px-[3vw]"
>
    {text}
</button>
