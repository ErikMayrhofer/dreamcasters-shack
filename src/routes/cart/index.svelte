<script lang="ts" context="module">
  export async function preload(page) {
    let cartContent: CartItem[];

    if ("encodedCartContents" in page.query) {
      const cartData = decodeCart(page.query.encodedCartContents);
      cartContent = cartData;
    } else {
      cartContent = get(cart).items;
    }

    console.log("Prefetching Cart");
    const artworks = await client
      .items("artworks")
      .read(cartContent.map((it) => it.id));
    console.log("Prefetched: ", artworks);

    return { cartData: artworks };
  }
</script>

<script lang="ts">
  import Paypal from "../../components/Paypal.svelte";
  import { client } from "../../lib/api";
  import { cart, decodeCart } from "../../lib/cart";
  import type { CartData, CartItem } from "../../lib/cart";
  import { get } from "svelte/store";
  import type { Artwork } from "../../lib/model";

  export let cartData: Artwork[];
  export let javascriptNotice: boolean = false;
</script>

<h1>Cart</h1>

<ul>
  {#each cartData.items as item}
    <li>
      {JSON.stringify(item)}
    </li>
  {/each}
</ul>

<Paypal />

<style>
</style>
