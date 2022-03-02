<script lang="ts">
  import Switch from 'svelte-switch';
  import { Icon } from '@steeze-ui/svelte-icon';

  export let toggled: boolean;
  export let label: string;
  export let checkedIcon: any = null;
  export let uncheckedIcon: any = null;
  export let offColor = '#2E282A';
  export let onColor = '#FBF5F3';
  export let offIconClass = 'text-white';
  export let onIconClass = 'text-black';

  const id = 'toggle-' + (Math.random() + 1).toString(36).substring(7);
</script>

<label for={id}>{label}</label>
<Switch bind:checked={toggled} {id} {offColor} {onColor}>
  <div slot="checkedIcon">
    {#if checkedIcon}
      <Icon src={checkedIcon} class={onIconClass} data-testid="checked-icon" />
    {/if}
  </div>
  <div slot="unCheckedIcon">
    {#if uncheckedIcon}
      <Icon src={uncheckedIcon} class={offIconClass} data-testid="unchecked-icon" />
    {/if}
  </div>
</Switch>
