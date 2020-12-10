<script>
  import Swal from 'sweetalert2';

  import Decisions from './Decisions.svelte';
  import removeRedundantDecisionsData from './removeRedundantDecisionData';

  let importedData;

  let data = {
    message: '',
    decisions: [],
  };

  $: stringifiedData = JSON.stringify(
    {
      ...data,
      decisions: removeRedundantDecisionsData(data.decisions),
    },
    null,
    2,
  );

  const onJsonImport = () => {
    try {
      data = JSON.parse(importedData);

      Swal.fire({
        title: 'JSON data imported successfully',
        icon: 'success',
        toast: true,
        timerProgressBar: true,
        timer: 3000,
        position: 'top',
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Could not parse the provided JSON data',
        heightAuto: false,
      });
    }
  };

  const onCopyToClipboard = () => {
    navigator.clipboard
      .writeText(stringifiedData)
      .then(() => {
        Swal.fire({
          title: 'Copied to clipboard',
          icon: 'success',
          toast: true,
          timerProgressBar: true,
          timer: 3000,
          position: 'top',
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Could not copy the data to clipboard',
          heightAuto: false,
        });
      });
  };
</script>

<style>
  .scrollableFullContainer {
    flex: 1;
    overflow-y: auto;
  }
</style>

<main>
  <section>
    <div class="topLabel">
      <b>Paste & import</b>
      <button on:click={onJsonImport}>
        <div>Import JSON</div>
        <img src="/assets/icon/upload.svg" alt="Import icon" />
      </button>
    </div>
    <textarea
      bind:value={importedData}
      placeholder="Paste your JSON data here" />
  </section>
  <section>
    <div class="topLabel"><b>Edit the data here</b></div>
    <div class="scrollableFullContainer">
      <div class="inputRowVertical">
        <div>Message</div>
        <textarea rows="5" bind:value={data.message} />
      </div>
      <Decisions bind:decisions={data.decisions} />
    </div>
  </section>
  <section>
    <div class="topLabel">
      <b>Resulting JSON</b>
      <div>
        <button on:click={onCopyToClipboard}>
          <div>Copy to clipboard</div>
          <img src="/assets/icon/copy.svg" alt="Copy icon" />
        </button>
      </div>
    </div>
    <textarea readonly value={stringifiedData} />
  </section>
</main>
