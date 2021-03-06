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
        {#if !!artwork.title_image}
          <img
            alt="Preview for {artwork.name}"
            src="https://api.dreamcaster.obyoxion.at/assets/{artwork.title_image}?key=thumbnail"
          />
        {/if}
        <div>
          <h1>
            {artwork.name}
          </h1>
          <span>
            {artwork.price}
          </span>
        </div>
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 2em;
    row-gap: 2em;
  }

  img {
    border-radius: 1em;
    width: calc(100% + 2px);
    margin: -1px;
  }
  li {
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1em 1em 5px 5px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    transform: scale(1);
    transition: 300ms box-shadow, 300ms transform;
  }

  li:hover {
    transform: scale(1.08);
    box-shadow: 0 0 10px black, 5px 5px 20px black;
  }

  div {
    padding: 1em;
    padding-top: 0;
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 2em;
    padding: 0;
    margin-top: 0;
  }
</style>
