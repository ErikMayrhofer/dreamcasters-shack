<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount } from "svelte";
  import { cart } from "../lib/cart";
  import { page } from "$app/stores";

  let segment: string;
  $: segment = $page.path;

  onMount(() => {
    cart.useLocalStorage();
  });
</script>

{#if segment != "/"}
  <Nav {segment} />
{/if}

<main class:full={segment == "/"}>
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
    --main-padding: 2em;
    position: relative;
    max-width: min(var(--content-width), 100vw);
    padding: var(--main-padding);
    margin: 0 auto;
    box-sizing: border-box;
    /* TODO: Creates problems somewhy min-height: 100vh; */
  }

  @media only screen and (max-width: 600px) {
    main {
      --main-padding: 1em;
    }
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
