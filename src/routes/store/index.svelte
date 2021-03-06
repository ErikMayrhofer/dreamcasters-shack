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
      {#if !!artwork.title_image}
        <img
          src="https://api.dreamcaster.obyoxion.at/assets/{artwork.title_image}?key=thumbnail"
        />
      {/if}
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
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2em;
    row-gap: 2em;
  }

  li > img {
    width: 100%;
  }
</style>
