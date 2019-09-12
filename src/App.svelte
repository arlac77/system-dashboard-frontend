<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import { LogView, lineIterator} from 'svelte-log-view';

  import Journal from "./components/Journal.svelte";
  import { router, session } from "./main.mjs";
  import { config } from "../package.json";


  const source=lineIterator(fetch(config.journalUrlPrefix + "/entries"));

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <Link href="/">
    <h2>Dashboard</h2>
  </Link>
  <ul>
    <li>
      <Link href="/about">
        <h3>About</h3>
      </Link>
    </li>
    <li>
      {#if $session.isValid}
        <a href="/" on:click|preventDefault={logout}>
          Logout {$session.username}
        </a>
      {:else}
        <Link href="/login">
          <h3>Login</h3>
        </Link>
      {/if}
    </li>
  </ul>
</nav>
<main>
  <Outlet {router}>nothing there</Outlet>

<!--
  <Journal />
-->

  <LogView source={source} />
</main>
