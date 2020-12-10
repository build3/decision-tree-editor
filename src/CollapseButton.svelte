<script>
  // eslint-disable-next-line import/prefer-default-export
  export let rotated = false;
</script>

<style>
  svg {
    transition: transform 0.125s ease-out;
    transform: scaleY(1);
  }

  .rotated {
    transform: scaleY(-1);
  }
</style>

<button class="iconButton" on:click>
  <svg
    class={rotated ? 'rotated' : ''}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"><path
      d="M1 7l6.5 7L14 7M1 1.5l6.5 7 6.5-7"
      stroke="currentColor"
      stroke-linecap="square" /></svg>
</button>
