<script>
  import background_large from "$lib/images/background/background_complete.webp";
  import background_preview from "$lib/images/background/background_complete_640_bad.webp";
  import hero_preview from "$lib/images/hero_640_bad.webp";
  import hero_large from "$lib/images/hero.webp";
  import HeroContent from "../components/HeroContent.svelte";
  import { onMount } from "svelte";
  import { lazyImage } from "$lib/image";

  let hero = hero_preview;
  let background = background_preview;

  onMount(() => {
    lazyImage(background_large, (it) => (background = it));
    lazyImage(hero_large, (it) => (hero = it));
  });

  function scroll() {
    let sel = document.querySelector("#windows");
    sel.scrollIntoView({
      behavior: "smooth",
    });
    sel.focus();
  }
</script>

<svelte:head>
  <title>Dreamcasters Shack</title>
</svelte:head>

<!--<Login />-->
<div class="hero">
  <img src={hero} alt="hero" />
  <div class="hero-content-holder">
    <HeroContent />
    <button class="scrolldown" on:click={() => scroll()}>
      <svg viewBox="0 0 100 100">
        <polyline points="10,10 50,60 90,10" />
      </svg>
    </button>
  </div>
</div>
<div class="content">
  <div class="window anchor" id="windows" />
  <div class="window a" />
  <div class="window b" />
  <div class="window c" />
  <div style="background-image: url({background})" class="background" />
  <div class="bottom-shadow" />
</div>

<style>
  .hero > img {
    object-fit: cover;
    object-position: 50% 50%;
  }
  .hero > img,
  .hero > .hero-content-holder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  div.hero {
    background-size: cover;
    background-attachment: fixed;
    background-position: 50% 50%;

    width: 100%;
    height: 100vh;
    position: relative;
    background-color: var(--color-black);
  }
  button.scrolldown {
    all: unset;
    position: absolute;
    bottom: calc(3vw + 70px);
    position: relative;
    width: 70px;
    cursor: pointer;
    z-index: 20;
    margin: 0 calc(50% - 45px);
    animation: scrolldownbutton 3s ease-out 0s infinite;
  }
  @media only screen and (max-width: 1000px) {
    button.scrolldown {
      bottom: calc(10vw + 70px);
    }
  }
  @keyframes scrolldownbutton {
    0% {
      transform: translateY(0%) scaleY(1);
    }
    20% {
      transform: translateY(20%) scaleY(1.1);
    }
    25% {
      transform: translateY(15%) scaleY(1.05);
    }
    30% {
      transform: translateY(20%) scaleY(1.1);
    }
    35% {
      transform: translateY(20%) scaleY(1.1);
    }
    50% {
      transform: translateY(0%) scaleY(1);
    }
  }
  button.scrolldown polyline {
    stroke: white;
    stroke-width: 5px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: 0.2s stroke-width;
  }
  button.scrolldown:hover polyline {
    stroke-width: 7px;
  }
  div.content {
    margin-top: -9vw;
    position: relative;
    width: 100%;
    overflow-x: hidden;
  }
  div.background {
    width: 100vw;
    position: relative;
    margin-bottom: -4px; /*Why? Without this there is an ever so small hole at the bottom*/
    pointer-events: none;

    padding-top: 250%;
    height: 0;
    overflow: hidden;

    /*Aspect Ratio: 2w 5h - Use this aspect ratio box to prevent layout shifts*/
    background-size: cover;
  }
  .window {
    position: absolute;
  }

  .bottom-shadow {
    position: relative;
    height: 6px;
    width: 100%;
    background-color: var(--color-footer);
    box-shadow: 0 0 2vw 3vw var(--color-footer);
  }
  .window.anchor {
    top: 40vw;
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
