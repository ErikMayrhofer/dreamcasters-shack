<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment: string;
</script>

{#if !!segment}
  <Nav {segment} />
{/if}

<main class:full={!segment}>
  <slot />
</main>

<!-- <div>
  {#if !!segment}
    <div class="footer-border" />
  {/if} -->
<Footer />

<!-- </div> -->
<style>
  main {
    position: relative;
    max-width: var(--content-width);
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    /* TODO: Creates problems somewhy min-height: 100vh; */
  }

  /* .footer-border {
    width: 100%;
    height: 2px;
    background-color: var(--color-secondary);
  } */
  main.full {
    width: 100%;
    max-width: 100vw;
    padding: 0;
    margin: 0;
    min-height: unset;
  }
</style>
