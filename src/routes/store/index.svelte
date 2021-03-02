<script context="module" lang="ts">
  import { client } from "../../lib/api";

  export async function preload(page, session) {
    try {
      console.log("Prefetching Artworks");
      const artworks = await client.items("artworks").read();
      console.log("Feching Succeeded");
      return { artworks: artworks.data };
    } catch (e) {
      console.log("Fetching of Artworks failed: ", e);
    }
    console.log("Wut?");
    this.error(500, "Prefetch failed");
  }
</script>

<script lang="ts">
  import type { Artwork } from "../../lib/model";

  export let artworks: Artwork[];
  console.log("Artworks: ", artworks);
</script>

<ul>
  {#each artworks as artwork}
    <li>
      <a href="/store/{artwork.id}" sapper:prefetch>
        <span>
          {artwork.name}
        </span>
        <span>
          {artwork.price}
        </span>
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
  }
</style>
