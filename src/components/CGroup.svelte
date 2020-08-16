<script>
  import { ObjectLink } from "svelte-guard-history-router";
  export let cgroup;
</script>

<ul>
  {#each Object.entries(cgroup) as c}
    <li>
      {c[0]}
      <ul>
        {#each c[1] as e}
          <li>{e}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
