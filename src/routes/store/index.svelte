<script context="module" lang="ts">
  import { api } from "$lib/api";
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session, fetch }) {
    try {
      console.log("Prefetching Artworks");
      const artworks = await api.artworks(fetch);
      console.log("Feching Succeeded", artworks);
      return { props: { artworks: artworks } };
    } catch (e) {
      console.error("Fetching Artworks Failed: ", e);
      return {
        status: 500,
        error: e,
      };
    }
  }
</script>

<script lang="ts">
  import { getAsset, ThumbnailKey } from "$lib/api";
  import type { Artwork } from "../../lib/model";

  export let artworks: Artwork[];
  console.log("Artworks: ", artworks);
</script>

<ul>
  {#each artworks as artwork}
    <li>
      <a href="/store/{artwork.id}" sveltekit:prefetch>
        {#if !!artwork.title_image}
          <img
            alt="Preview for {artwork.name}"
            src={getAsset(artwork.title_image, ThumbnailKey.Thumbnail250)}
            width="250"
            height="250"
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
    min-width: 0;
    width: calc(100% + 2px);
    height: auto;
    margin: -1px;

    transition: var(--trans) box-shadow, var(--trans) transform;
    box-shadow: none;

    display: block; /*Also display as square when fetch fails*/
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
