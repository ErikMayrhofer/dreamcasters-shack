<script lang="ts">
  import { onMount } from "svelte";

  import { cart, encodeCart } from "../lib/cart";

  import type { Entity } from "../lib/model";
  export let item: Entity;

  let state = null;

  onMount(() => {
    const unsubscribe = cart.subscribe((value) => {
      state = encodeCart([...value.items, { id: item.id }]);
    });
    return () => {
      unsubscribe();
    };
  });
</script>

<a href="/cart?{state}" target=""> Buy Now </a>
