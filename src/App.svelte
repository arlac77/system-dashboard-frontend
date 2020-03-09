<script>
  import * as style from "./main.css";
  import { Outlet, link, active } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <a href="/" use:link={router} use:active={router}>
    <img class="logo" src="logo.svg" alt="System Dashboard" />
    System Dashboard
  </a>
  <ul class="left">
    <li>
      <a href="/systemctl" use:link={router} use:active={router}>Systemctl</a>
      <a href="/journal" use:link={router} use:active={router}>Journal</a>
      <a href="/services" use:link={router} use:active={router}>Services</a>
      <a href="/about" use:link={router} use:active={router}>About</a>
    </li>
  </ul>
  <ul>
    <li>
      {#if $session.isValid}
        <Menue>
          <div slot="title" class="dropdown-trigger">{$session.username}</div>
          <div slot="content" class="dropdown-menu dropdown-menu-sw">
            <a href="/" class="dropdown-item" on:click|preventDefault={logout}>
              Signed in as {$session.username}
            </a>
            <div class="dropdown-divider" />
            <a href="#!" class="dropdown-item">Entitlements</a>
            <div class="dropdown-divider" />
            <a href="#!" class="dropdown-item" on:click|preventDefault={logout}>Sign out</a>
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
</main>
