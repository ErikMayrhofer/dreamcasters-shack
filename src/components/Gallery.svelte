<script lang="ts">
  import { getAsset } from "$lib/api";
  import type { Artwork } from "$lib/model";

  export let item: Artwork;

  let images = [
    item.title_image,
    ...item.gallery.map((it) => it.directus_files_id),
  ];

  let index = 0;
  let currentImage;

  $: currentImage = images[index];
  $: console.log(currentImage);

  let fullscreen = false;

  function next() {
    index++;
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
  }
  function prev() {
    index--;
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
  }
  function enterFullscreen() {
    fullscreen = true;
  }
  function closeFullscreen() {
    fullscreen = false;
  }
</script>

<div class="img-container" class:fullscreen>
  <img src={getAsset(currentImage)} alt={item.name} />

  <button on:click={enterFullscreen}>F</button>
</div>

{#if fullscreen}
  <div class="overlay" on:click={closeFullscreen}>
    <button class="close">X</button>
    <img
      on:click|stopPropagation={() => {}}
      src={getAsset(currentImage)}
      alt={item.name}
    />
    <div>
      <button on:click|stopPropagation={next}>Next</button>
      <button on:click|stopPropagation={prev}>Prev</button>
    </div>
  </div>
{/if}

<style>
  .img-container {
    width: 100%;
    height: 600px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .img-container > * {
    opacity: 0;
    transition: 200ms opacity;
  }

  .img-container > img {
    opacity: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 0;
    filter: brightness(1) contrast(1);
    transition: 200ms filter;
  }

  .img-container:is(:hover, .fullscreen) > img {
    filter: brightness(0.5) contrast(0.8);
  }

  .img-container:is(:hover, .fullscreen) > * {
    opacity: 1;
  }

  .img-container > button {
    position: relative;
    align-self: center;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000c;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .overlay > img {
    max-width: 80%;
    height: 80%;
  }

  .close {
    justify-content: start;
  }
</style>
