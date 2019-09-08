<script>
  import { Outlet, Link } from "svelte-guard-history-router";
  import Journal from "./components/Journal.svelte";
  import { router, session } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <Link href="/">
    <img class="logo" src="hook_ci.svg" alt="Hook CI" />
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

  <Journal />
</main>
