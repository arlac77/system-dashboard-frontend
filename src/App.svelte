<script>
  import * as style from "./main.css";
  import { Router, Route, Outlet } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import About from "./pages/About.svelte";
  import Journal from "./pages/Journal.svelte";
  import Systemctl from "./pages/Systemctl.svelte";
  import Services from "./pages/Services.svelte";
  import { router, session, needsSession } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<Router {router}>
  <nav>
    <Route href="/" path="*" component={Home}>
      <img class="logo" src="logo.svg" alt="System Dashboard" />
      System Dashboard
    </Route>
    <ul class="left">
      <li>
        <Route path="/systemctl" guards={needsSession} component={Systemctl}>
          Systemctl
        </Route>
        <Route path="/journal" guards={needsSession} component={Journal}>
          Journal
        </Route>
        <Route path="/services" guards={needsSession} component={Services}>
          Services
        </Route>
        <Route path="/about" component={About}>About</Route>
      </li>
    </ul>
    <ul>
      <li>
        {#if $session.isValid}
          <Menue>
            <div slot="title" class="dropdown-trigger">{$session.username}</div>
            <div slot="content" class="dropdown-menu dropdown-menu-sw">
              <a
                href="/"
                class="dropdown-item"
                on:click|preventDefault={logout}>
                Signed in as {$session.username}
              </a>
              <div class="dropdown-divider" />
              <a href="#!" class="dropdown-item">Entitlements</a>
              <div class="dropdown-divider" />
              <a
                href="#!"
                class="dropdown-item"
                on:click|preventDefault={logout}>
                Sign out
              </a>
            </div>
          </Menue>
        {:else}
          <Route path="/login" component={Login}>Login</Route>
        {/if}
      </li>
    </ul>
  </nav>
  <main>
    <Outlet />
  </main>
</Router>
