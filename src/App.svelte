<script>
  import { Outlet, link, active } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
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
        <Menue>
          <div slot="title" class="dropdown-trigger">{$session.username}</div>
          <div slot="content" class="dropdown-menu dropdown-menu-sw">
            <a href="/" class="dropdown-item" on:click|preventDefault={logout}>
              Logout {$session.username}
            </a>
            <div class="dropdown-divider" />
            <a href="#!" class="dropdown-item">three</a>
          </div>
        </Menue>
      {:else}
        <a href="/login" use:link={router} use:active={router}>Login</a>
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
