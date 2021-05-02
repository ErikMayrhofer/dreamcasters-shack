<script lang="ts">
  const OFFSET = 20;
</script>

<svg width="100" height="100">
  <polyline points="5,{5 + OFFSET} 5,5 {5 + OFFSET},5" />
  <polyline points="{95 - OFFSET},5 95,5 95,{5 + OFFSET}" />
  <polyline points="95,{95 - OFFSET} 95,95 {95 - OFFSET},95" />
  <polyline points="{5 + OFFSET},95 5,95 5,{95 - OFFSET}" />
</svg>

<style lang="scss">
  @use './icons';
</style>
