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
    --column-count: 4;
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
    column-gap: 1em;
    row-gap: 1em;
  }

  @media only screen and (max-width: 1400px) {
    ul {
      --column-count: 3;
    }
  }

  @media only screen and (max-width: 1000px) {
    ul {
      --column-count: 2;
    }
  }

  img {
    width: calc(100% + 2px);
    margin: -1px;

    transition: var(--trans) box-shadow, var(--trans) transform;
    box-shadow: none;
  }
  li {
    --trans: 300ms;
    border: var(--light-border);
    background-color: var(--color-light);
    box-shadow: none;
    transform: scale(1);
    transition: var(--trans) box-shadow, var(--trans) transform,
      var(--trans) border;
  }

  @media only screen and (min-width: 600px) {
    ul {
      column-gap: 3em;
      row-gap: 3em;
    }
    li:hover {
      /*Only use this when column-gap is at least 3em*/
      transform: scale(1.08);
      box-shadow: 0 0 10px black, 5px 5px 20px black;
      border: 1px solid rgba(255, 255, 255, 0);
    }
    li:hover img {
      /*Only use this when column-gap is at least 3em*/
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), 5px 5px 30px rgba(0, 0, 0, 0.5);
    }
  }

  div {
    padding: 1em;
    padding-top: 0;
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: var(--font-size-large);
    padding: 0;
    margin-top: 1rem;
  }
</style>
