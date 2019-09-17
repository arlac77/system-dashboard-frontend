<script>
  import { Outlet, link, active } from "svelte-guard-history-router";
  import { LogView, lineIterator } from "svelte-log-view";

  import Journal from "./components/Journal.svelte";
  import { router, session } from "./main.mjs";
  import { config } from "../package.json";

  const source = lineIterator(fetch(config.journalUrlPrefix + "/entries"));

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <a href="/" use:link={router} use:active={router}>
    <h2>Dashboard</h2>
  </a>
  <ul class="left">
    <li>
      <a href="/about" use:link={router} use:active={router}>
        <h3>About</h3>
      </a>
    </li>
  </ul>
  <ul>
    <li>
      {#if $session.isValid}
        <a href="/" on:click|preventDefault={logout}>
          Logout {$session.username}
        </a>
      {:else}
        <a href="/login" use:link={router} use:active={router}>
          <h3>Login</h3>
        </a>
      {/if}
    </li>
  </ul>
</nav>
<main>
  <Outlet {router} />

  <!--
  <Journal />
-->

  <LogView {source} />
</main>
