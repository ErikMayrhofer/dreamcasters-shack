<script lang="ts">
  export let segment: string;
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? "page" : undefined} href=".">
        Dreamcasters Shack
      </a>
    </li>

    <li class="shop">
      <ul>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === "dolls" ? "page" : undefined}
            href="store/dolls"
          >
            Dolls
          </a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === "dice" ? "page" : undefined}
            href="store/dice"
          >
            Dice
          </a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === "decoration" ? "page" : undefined}
            href="store/decoration"
          >
            Deco
          </a>
        </li>
      </ul>
    </li>

    <li>
      <a
        rel="prefetch"
        aria-current={segment === "about" ? "page" : undefined}
        href="about"
      >
        About us
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    padding: 0 1em;
    display: grid;
  }

  nav > ul {
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 0;
  }

  li {
    display: block;
    float: left;
    justify-self: center;
  }
  li:first-of-type {
    justify-self: start;
  }
  li:last-of-type {
    justify-self: end;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 0.5em 1em;
    display: block;
    color: white;
    font-size: 2em;
    font-family: var(--font-accent);
    font-weight: bold;
    font-style: italic;
    /* font-family: sans-serif; */
    /* font-family: var(--font-primary); */
    /* font-style: italic; */
  }

  a::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--color-primary);
  }
</style>
