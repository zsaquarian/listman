<script lang="ts">
  import type { GenericList } from '@utils/listUtils';
  import ItemDisplay from './ItemDisplay.svelte';
  import ListHeader from './ListHeader.svelte';

  export let isMasterList = false;
  export let isShared = false;
  export let removeItem: (i: number) => void;
  export let list: GenericList;
  export let listUuid: string;

  let addInput: string;

  let hovering = -1;

  const drop = (event: DragEvent, target: number) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData('text/plain'));
    const newList = list.items;

    console.log(start, target);

    if (target - 1 == start) {
      console.log(target + 1, start);
    }

    if (start < target) {
      newList.splice(target + 1, 0, newList[start]);
      newList.splice(start, 1);
    } else {
      newList.splice(target, 0, newList[start]);
      newList.splice(start + 1, 1);
    }
    list.items = newList;
    hovering = -1;
  };

  const dragstart = (event: DragEvent, i: number) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('text/plain', i.toString());
  };

  $: selected = list && list.items && list.items.filter((val) => val.done);
</script>

<div class="lg:w-3/4 mx-auto flex flex-col items-center">
  <div class="p-2 w-full">
    {#if list && list.items}
      <ListHeader {list} {isMasterList} {isShared} {selected} {listUuid} />
      {#if list.items.length == 0}
        <h1 class="text-2xl text-gray-400 text-center">Try adding some items</h1>
      {/if}
      {#each list.items as { item, done }, i (i)}
        <div
          draggable={true}
          on:dragstart={(event) => dragstart(event, i)}
          on:drop|preventDefault={(event) => drop(event, i)}
          ondragover="return false"
          on:dragenter={() => (hovering = i)}
          class={`${hovering === i ? 'dark:bg-accent-900 bg-accent-200' : ''} rounded-md`}
        >
          <ItemDisplay
            bind:checked={done}
            bind:itemName={item}
            shouldLineThrough={!isMasterList}
            removeItem={() => {
              removeItem(i);
            }}
            class="m-2 p-2"
          />
        </div>
      {/each}
    {/if}
  </div>
  <form
    class="flex sticky bottom-0 bg-accent-200 dark:bg-accent-800 m-0 w-full lg:rounded-lg lg:w-3/4"
    on:submit|preventDefault={() => {
      // regex which checks for non-whitespace strings
      if (/\S*$/.test(addInput) && addInput) {
        if (isShared) {
          list.items.push({ item: addInput, done: false });
        } else {
          list.items = [...list.items, { item: addInput, done: false }];
        }
        addInput = '';
      }
    }}
  >
    <input
      type="text"
      class="input w-full m-2 rounded-lg p-2 dark:text-black"
      bind:value={addInput}
      placeholder="Enter the name of a new item"
    />
    <button
      class="ml-auto m-2 rounded-lg bg-primary-500 border-opacity-0 border-white border-2 transition-colors hover:border-opacity-100 text-white p-2"
      type="submit">Add item</button
    >
  </form>
</div>
