<script context="module" lang="ts">
  import { client, getAsset } from "../../lib/api";

  export async function preload({ params }) {
    try {
      //console.log("Prefetching Artwork ", params.slug);
      const item = await client.items("artworks").read(params.slug);
      //console.log("Artwork: ", item);
      return { item: item.data };
    } catch (e) {
      console.trace("Promise Failed", e);
    }
    this.error(404, "Not found");
  }
</script>

<script lang="ts">
  import Paypal from "../../components/Paypal.svelte";
  import type { Artwork } from "../../lib/model";

  export let item: Artwork;
  //console.log("Artwork: ", item);
</script>

<img src={getAsset(item.title_image)} alt={item.name} />
<div class="mobile-wrapper">
  <header class="card">
    <h1>
      {item.name}
    </h1>
  </header>
  <article class="card">
    <section class="details">
      <h2>Shop</h2>
      <p>{item.price} €</p>
      <Paypal />
    </section>
    <section class="description">
      <h2>Details</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed
        lectus
      </p>
    </section>
    <section class="footer">
      <h2>Dreamcasters Shack</h2>
      <p>
        Alles selbergemacht undso, generelles gerede über den shop, bei anfragen
        gerne kontakt undso, puh was noch? Ich erfinde hier noch ein bisschen
        Text, damit es zweizeilig wird sonst schauts nämlich irgendwie einsam
        aus.
      </p>
    </section>
  </article>
</div>

<style>
  img {
    width: calc(100% + 2 * var(--main-padding));
    margin: calc(0px - var(--main-padding));
    margin-bottom: -30px;
  }
  .card {
    background-color: var(--color-light);
    box-shadow: 0 0 10px black;
    position: relative; /*To set overlay*/
  }

  header {
    padding: 1em;
  }

  article {
    --columns: 2;
    display: grid;
    margin-top: 2em;
    grid-template-columns: repeat(var(--columns), minmax(0px, 1fr));
    grid-template-rows: auto;
    grid-template-areas: "details description" "footer footer";
    align-items: stretch;
  }

  section {
    min-width: 10em;
    padding: 1em;
    border-bottom: var(--light-border);
  }

  section:last-of-type {
    border-bottom: none;
  }

  @media only screen and (max-width: 1000px) {
    header {
      border-bottom: var(--light-border);
    }
    article {
      --columns: 1;
      grid-template-areas: "details" "description" "footer";
      margin-top: 0;
    }
    section {
      box-shadow: none;
      padding-bottom: 2em;
    }
    .card {
      box-shadow: none;
    }
    .mobile-wrapper {
      position: relative;
      box-shadow: 0 0 10px black;
    }
  }
  section.description {
    grid-area: description;
    text-justify: inter-word;
    text-align: justify;
  }

  section.details {
    grid-area: details;
  }
  section.footer {
    grid-area: footer;
  }

  p::first-letter {
    display: block;
    float: left;
    font-size: 2em;
    padding-left: 0.2em;
    padding-right: 0.3em;
    margin-bottom: -0.1em;
    padding-top: 0.1em;
    font-family: var(--font-primary);
    color: var(--color-primary);
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
    padding: 0;
    text-align: center;
    font-size: var(--font-size-xx-large);
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
</style>
