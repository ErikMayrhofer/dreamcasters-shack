<script lang="ts">
  import { api } from "$lib/api";

  import { cart } from "$lib/cart";
  import type { Artwork } from "$lib/model";

  import { onMount } from "svelte";
  import Paypal from "./Paypal.svelte";

  export let currentItem: Artwork | null = null;

  let rawItems: Artwork[] = [];
  let items: Artwork[] = [];
  let allItems: Artwork[] = [];
  let contained: boolean = false;

  $: items = rawItems.filter((it) => it.id != currentItem.id);
  $: contained = rawItems.findIndex((it) => it.id === currentItem.id) >= 0;
  $: allItems = [...items, ...(currentItem ? [currentItem] : [])];

  onMount(() => {
    const sub = cart.subscribe(async (value) => {
      console.log("Cart update: ", value);
      const response = await api.artwork(
        fetch,
        value.items.map((it) => it.id)
      );
      console.log("REsponse: ", response);
      rawItems = response;
    });
    return () => {
      sub();
    };
  });

  $: console.log("ITEMS: ", items, allItems);

  function remove(item: Artwork) {
    //Only Remove for preview purposes.
    items = items.filter((it) => it.id !== item.id);
    cart.remove(item.id);
  }
</script>

{#if allItems.length > 0}
  <p>Buy {allItems.length} Artwork Now</p>
  <table>
    <thead>
      <th>Name</th>
      <th>Price</th>
    </thead>
    {#each items as item}
      <tr>
        <td>
          <button on:click={() => remove(item)}>X</button>
        </td>
        <td><a href="/store/{item.id}">{item.name}</a></td>
        <td>{item.price}</td>
      </tr>
    {/each}
    {#if currentItem}
      <tr>
        <td>C</td>
        <td>{currentItem.name}</td>
        <td>{currentItem.price}</td>
      </tr>
    {/if}
  </table>
{/if}
<div class:hidden={allItems.length == 0}>
  <Paypal />
</div>

<style>
  table {
  }

  div.hidden {
    display: none;
  }
</style>
