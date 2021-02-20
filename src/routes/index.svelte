<script>
  import successkid from "images/successkid.jpg";
  import Login from "../components/Login.svelte";
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Work in Progress..</h1>
<p>This site is still heavily under construction.</p>

<!--<Login />-->
<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
