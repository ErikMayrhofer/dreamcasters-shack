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
<div class="cart-button">
  {#if !contained}
    <button class="button" on:click={add}>Add To Cart</button>
  {/if}
</div>
<p class="raised">
  <Cart />
</p>

<style>
  div.cart-button {
    height: 50px;
  }
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

  p.raised {
    border: 1px solid #000;
    background-color: #0008;
    box-shadow: 0 0 10px 0 black;
    border-radius: 1em;
    padding: 1em;
  }
</style>
