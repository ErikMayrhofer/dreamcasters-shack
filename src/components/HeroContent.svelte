<script lang="ts">
</script>

<div class="hero-content">
  <h1>Dreamcasters<br />Shack</h1>
  <p style="font-weight: bold;">
    This site is still heavily under development.
  </p>
  <a class="button shop" href="/store">Shop</a>
  <p>And this is the place, where our beautiful catch-phrase will reside.</p>
</div>

<style>
  .button.shop {
    font-size: 1.4em;
  }
  .hero-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: white;
    text-align: center; /*Is inherited by h1 and p*/
  }
  h1 {
    padding: 0;
    margin: 0;
    font-family: dreams, sans-serif;
    font-weight: normal;
    font-size: 3em;
    font-style: normal;
    text-shadow: 1px 1px 0 black, 2px 2px 0 black, 3px 3px 0 black;
  }
  p {
    font-family: var(--font-accent);
    font-style: italic;
    font-size: 2em;
    max-width: 20em;
    text-shadow: 0 0 5px black, 0 0 4px black;
  }

  @media only screen and (min-width: 1000px) {
    h1 {
      font-size: 5em;
      text-shadow: 1px 1px 0 black, 2px 2px 0 black, 3px 3px 0 black,
        4px 4px 0 black, 5px 5px 0 black;
    }
  }
  @media only screen and (min-width: 1500px) {
    h1 {
      font-size: 7em;
      text-shadow: 1px 1px 0 black, 2px 2px 0 black, 3px 3px 0 black,
        4px 4px 0 black, 5px 5px 2px black, 6px 6px 4px black, 7px 7px 6px black;
    }
  }
</style>
