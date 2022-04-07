<script lang="ts">
  import Toggle from '@components/Toggle.svelte';
  import { config } from '@store/config';
  import { Moon, Sun } from '@steeze-ui/heroicons';
  import { version } from '../../package.json';
</script>

<div class="flex-col text-3xl m-4 bg-primary-100 rounded-lg p-4 bg-opacity-25 shadow-lg">
  <div class="flex gap-5 items-center">
    <Toggle
      label="Dark mode"
      bind:toggled={$config.darkMode}
      uncheckedIcon={Sun}
      checkedIcon={Moon}
      onColor="#2E282A"
      offColor="#FBF5F3"
      offIconClass="text-black"
      onIconClass="text-white"
    />
  </div>

  <hr class="my-4" />

  <p class="text-xl text-center">Version no: {version}</p>
</div>
