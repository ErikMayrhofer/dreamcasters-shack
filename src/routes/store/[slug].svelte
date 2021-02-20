<script context="module" lang="ts">
  import { client } from "../../lib/api";

  export async function preload({ params }) {
    try {
      console.log("Prefetching Artwork ", params.slug);
      const item = await client.items("artworks").read(params.slug);
      console.log("Artwork: ", item);
      return { item: item.data };
    } catch (e) {
      console.log("Promise Failed", e);
    }
    this.error(404, "Not found");
  }
</script>

<script lang="ts">
  import type { Artwork } from "../../lib/model";

  export let item: Artwork;
  console.log("Artwork: ", item);
</script>

<a href="/store">Back</a>
<p>
  <span>{item.name}</span>
  <span>{item.price}</span>
</p>
