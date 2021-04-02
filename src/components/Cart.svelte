<script lang="ts">
  import { api } from "$lib/api";

  import { cart } from "$lib/cart";
  import type { Artwork } from "$lib/model";

  import { onMount } from "svelte";
  import Paypal from "./Paypal.svelte";

  let rawItems: Artwork[] = [];
  let items: Artwork[] = [];
  let contained: boolean = false;

  $: items = rawItems;

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

  function remove(item: Artwork) {
    //Only Remove for preview purposes.
    items = items.filter((it) => it.id !== item.id);
    cart.remove(item.id);
  }
</script>

<p class="cart-header">Cart</p>
<table>
  <thead>
    <tr>
      <th />
      <th>Name</th>
      <th>Price</th>
    </tr>
  </thead>
  {#each items as item}
    <tr>
      <td>
        <button on:click={() => remove(item)} class="remove">X</button>
      </td>
      <td><a href="/store/{item.id}">{item.name}</a></td>
      <td>{item.price} €</td>
    </tr>
  {:else}
    {#if !contained}
      <tr>
        <td colspan="3" class="empty-notice">Cart is empty.</td>
      </tr>
    {/if}
  {/each}
</table>
<div class:collapsed={items.length == 0} class="paypal">
  <p>Buy {items.length} Artwork Now</p>
  <Paypal />
</div>

<style>
  table {
    border: 1px solid white;
    margin-bottom: 1em;
    width: 100%;
    border-collapse: collapse;
  }

  th:first-of-type {
    width: 50px;
  }

  thead > tr {
    background-color: rgb(48, 48, 48);
  }
  td {
    text-align: center;
  }

  tr {
    height: 50px;
  }

  div.paypal {
    transition: 200ms max-height;
    max-height: 500px;
    overflow: hidden;
  }
  div.collapsed {
    max-height: 0;
  }

  td.empty-notice {
    color: #fff6;
  }

  p.cart-header {
    margin: 0;
    margin-bottom: 0.25em;
    font-size: 2em;
    font-weight: bold;
    color: var(--color-primary);
    font-family: var(--font-accent);
    font-style: italic;
  }

  button.remove {
    border: none;
    background-color: #fff1;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin: 5px;
  }
  button.remove:hover {
    background-color: #fff3;
  }
  p {
    text-align: center;
  }
</style>
