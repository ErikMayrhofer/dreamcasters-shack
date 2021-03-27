<script lang="ts" context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    console.log(page);
    const query = page.query as URLSearchParams;
    let cartContent: CartItem[];

    if (query.has("encodedCartContents")) {
      const cartData = decodeCart(query.get("encodedCartContents"));
      cartContent = cartData;
    } else {
      cartContent = get(cart).items;
    }

    console.log("Prefetching Cart", cartContent);
    const artworks = await api.artwork(
      fetch,
      cartContent.map((it) => it.id)
    );

    // const artworks = await client
    //   .items("artworks")
    //   .read(cartContent.map((it) => it.id));
    console.log("Prefetched: ", artworks.data);

    if (artworks.data) {
      return { props: { cartData: artworks.data } };
    } else {
      return {
        status: 404,
      };
    }
  }
</script>

<script lang="ts">
  import Paypal from "../../components/Paypal.svelte";
  import { api } from "../../lib/api";
  import { cart, decodeCart } from "../../lib/cart";
  import type { CartData, CartItem } from "../../lib/cart";
  import { get } from "svelte/store";
  import type { Artwork } from "../../lib/model";

  export let cartData: Artwork[];
  export let javascriptNotice: boolean = false;
</script>

<h1>Cart</h1>

<ul>
  {#each cartData as item}
    <li>
      {JSON.stringify(item)}
    </li>
  {/each}
</ul>

<Paypal />

<style>
</style>
