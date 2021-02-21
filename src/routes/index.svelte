<script>
  import background_large from "images/background/background_complete.webp";
  import background_preview from "images/background_complete_640_bad.webp";
  import hero_preview from "images/hero_640_bad.webp";
  import hero_large from "images/hero.webp";
  import { onMount } from "svelte";
  import { lazyImage } from "../lib/image";

  let hero = hero_preview;
  let background = background_preview;

  onMount(() => {
    lazyImage(background_large, (it) => (background = it));
    lazyImage(hero_large, (it) => (hero = it));
  });
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<!--<Login />-->
<div class="parallaxhost">
  <div class="hero" style={`background-image: url("${hero}")`} />
  <img class="background" src={background} alt="background" />
</div>

<style>
  div.hero {
    object-fit: cover;
    object-position: 50% 50%;

    background-size: cover;
    background-attachment: fixed;

    width: 100vw;
    height: 100vh;
  }
  img.background {
    width: 100vw;
    margin-top: -100px;
  }
</style>
