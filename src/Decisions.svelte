<script>
  import Swal from 'sweetalert2';

  import AddButton from './AddButton.svelte';
  import RemoveButton from './RemoveButton.svelte';
  import CollapseButton from './CollapseButton.svelte';

  export let decisions = [];
  export let level = 0;

  const onAddDecision = () => {
    decisions = [
      ...decisions,
      {
        message: '',
        class: '',
        answer: '',
        decisions: [],
      },
    ];
  };

  const removeDecision = (removedIndex) => {
    decisions = decisions.filter((_, index) => index !== removedIndex);
  };

  const onToggleCollapsed = (collapsedIndex) => {
    decisions = decisions.map((decision, index) => {
      if (index === collapsedIndex) {
        return {
          ...decision,
          collapsed: !decision.collapsed,
        };
      }

      return decision;
    });
  };

  const onRemoveDecision = (removedIndex) => {
    Swal.fire({
      title: 'Warning',
      icon: 'warning',
      text: 'Are you sure you want to remove this decision?',
      showCancelButton: true,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'Yes, remove the decision',
      cancelButtonText: 'No, cancel',
      heightAuto: false,
    }).then((result) => {
      if (result.isDenied) {
        removeDecision(removedIndex);
      }
    });
  };

  $: articleStyle = `--evenColor: var(--level${level}EvenColor); --oddColor: var(--level${level}OddColor);`;
</script>

<style>
  :root {
    --level0EvenColor: #0077b6;
    --level0OddColor: #0096c7;
    --level1EvenColor: #00b4d8;
    --level1OddColor: #48cae4;
    --level2EvenColor: #90e0ef;
    --level2OddColor: #ade8f4;
    --level3EvenColor: #caf0f8;
    --level3OddColor: #edfafd;
  }

  .decisionContainer {
    box-sizing: border-box;
    padding-left: 0.75rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    width: 100%;
  }

  .decisionContainer > *:only-child {
    margin-bottom: 0;
  }

  .decisionContainer:first-of-type {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  .decisionContainer:last-of-type {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .decisionContainer:nth-of-type(even) {
    background-color: var(--evenColor);
  }

  .decisionContainer:nth-of-type(odd) {
    background-color: var(--oddColor);
  }

  .decisionDataContainer {
    padding-right: 0.75rem;
  }

  .decisionLabelContainer {
    align-items: center;
    display: flex;
    height: 2rem;
    justify-content: space-between;
  }
</style>

{#each decisions as decision, index}
  <article class="decisionContainer" style={articleStyle}>
    <div class="decisionDataContainer">
      <div class="inputRow">
        <b>Decision {index + 1}</b>
        <RemoveButton on:click={() => onRemoveDecision(index)} />
      </div>
      <div class="inputRowVertical">
        <div>Message</div>
        <textarea rows="5" bind:value={decision.message} />
      </div>
      <div class="inputRow">
        <span>Class</span><input bind:value={decision.class} />
      </div>
      <div class="inputRow">
        <span>Answer</span><input bind:value={decision.answer} />
      </div>
      {#if decision.decisions && decision.decisions.length > 0}
        <div
          class="decisionLabelContainer clickable"
          on:click={() => onToggleCollapsed(index)}>
          <div>Decisions</div>
          <CollapseButton rotated={decision.collapsed} />
        </div>
      {/if}
      {#if !decision.collapsed}
        <svelte:self
          level={(level + 1) % 4}
          bind:decisions={decision.decisions} />
      {/if}
    </div>
  </article>
{/each}

<article
  class="decisionContainer clickable"
  style={articleStyle}
  on:click={onAddDecision}>
  <div class="inputRow">
    <span>Add new decision</span>
    <AddButton />
  </div>
</article>
