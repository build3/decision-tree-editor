<script>
  import { debounce } from 'debounce';
  import Quill from 'quill';
  import { onMount } from 'svelte';

  export let value = '';

  let editorElement;
  let editor;

  const emitMessageChange = debounce(() => {
    value = editor ? editor.root.innerHTML : '';
  }, 100);

  onMount(() => {
    editor = new Quill(editorElement, {
      theme: 'bubble',
      bounds: editorElement,
      modules: {
        toolbar: ['link'],
      },
    });

    editor.on('text-change', emitMessageChange);
  });

  $: if (editor && editor.root.innerHTML !== value) {
    editor.clipboard.dangerouslyPasteHTML(value);
  }
</script>

<div class="inputRowVertical">
  <div>Message</div>
  <div bind:this={editorElement} class="editable" />
</div>
