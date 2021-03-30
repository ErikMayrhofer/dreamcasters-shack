<script lang="ts">
  import { cart } from "$lib/cart";

  import type { Artwork } from "$lib/model";
  import Cart from "./Cart.svelte";

  export let item: Artwork;

  let contained = false;

  $: contained = $cart.items.findIndex((it) => it.id === item.id) >= 0;

  function add() {
    cart.addItem({
      id: item.id,
    });
  }
  function remove() {
    cart.remove(item.id);
  }
</script>

<div class="pricing">{item.price} €</div>
{#if !contained}
  <p>
    <button on:click={add}>Add To Cart</button><span>and continue Shopping</span
    >
    <span>Or</span>
  </p>
{:else}
  <p>Item is in your cart.</p>
  <button on:click={remove}>Remove from Cart</button>
{/if}
<p>
  <Cart currentItem={item} />
</p>

<style>
  div.pricing {
    text-align: center;
    font-size: 2em;
    margin: 1em;
  }
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
