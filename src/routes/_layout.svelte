<script lang="ts">
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<!--
<Nav {segment} />
-->

<main class:full={!segment}>
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  main.full {
    width: 100vw;
    padding: 0;
    margin: 0;
  }
</style>
