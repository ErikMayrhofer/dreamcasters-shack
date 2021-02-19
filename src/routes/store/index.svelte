<script context="module" lang="ts">
  import { client } from "../../lib/api";

  export async function preload(page, session) {
    const artworks = await client.items("artwork").read();
    return { artworks: artworks.data };
  }
</script>

<script lang="ts">
  import type { Artwork } from "../../lib/model";

  export let artworks: Artwork[];
  console.log(artworks);
</script>

<ul>
  {#each artworks as artwork}
    <li>
      <a href="/store/{artwork.url}" sapper:prefetch>
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
