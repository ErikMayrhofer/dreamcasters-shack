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
<div class="hero" style={`background-image: url("${hero}")`} />
<div class="content">
  <div class="window a" />
  <div class="window b" />
  <div class="window c" />
  <img class="background" src={background} alt="background" />
</div>

<style>
  div.hero {
    object-fit: cover;
    object-position: 50% 50%;

    background-size: cover;
    background-attachment: fixed;
    background-position: 50% 50%;

    width: 100%;
    height: 100vh;
  }
  div.content {
    margin-top: -9vw;
    position: relative;
    width: 100%;
    overflow-x: hidden;
  }
  img.background {
    width: 100vw;
    position: relative;
  }
  .window {
    position: absolute;
  }
  .window.a {
    width: 50vw;
    height: 26vw;
    background-color: #5b7043;
    top: 58vw;
    left: 10vw;
  }
  .window.b {
    width: 55vw;
    height: 32vw;
    background-color: #437061;
    top: 110vw;
    left: 32vw;
  }
  .window.c {
    width: 54vw;
    height: 30vw;
    background-color: #435570;
    top: 167vw;
    left: 9vw;
  }
</style>
