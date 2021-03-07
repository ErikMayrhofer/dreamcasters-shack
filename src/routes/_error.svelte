<script lang="ts">
  export let status: number;
  export let error: Error;

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>Not found</title>
</svelte:head>

Looks like you got lost somewhere...
<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}

<style>
  pre {
    overflow-x: scroll;
    width: 100%;
  }
</style>
