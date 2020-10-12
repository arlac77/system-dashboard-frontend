<script>
  import * as style from "./main.css";
  import base from "consts:base";
  import {
    Router,
    Route,
    Outlet,
    redirectGuard
  } from "svelte-guard-history-router";
  import { Menue, TopNav } from "svelte-common";
  import Home from "./pages/Home.svelte";
  import Error from "./pages/Error.svelte";
  import Login from "./pages/Login.svelte";
  import About from "./pages/About.svelte";
  import Journal from "./pages/Journal.svelte";
  import Services from "./pages/Services.svelte";
  import SystemdUnitRoutes from "./SystemdUnitRoutes.svelte";
  import SystemdMachineRoutes from "./SystemdMachineRoutes.svelte";
  import SystemdTimerRoutes from "./SystemdTimerRoutes.svelte";
  import SystemdSocketRoutes from "./SystemdSocketRoutes.svelte";
  import NetworkRoutes from "./NetworkRoutes.svelte";
  import Fail2BanRoutes from "./Fail2BanRoutes.svelte";

  import { session } from "./main.mjs";
  
  const enshureSession = redirectGuard("/login", () => !session.isValid);
</script>

<Router {base}>
  <TopNav offset={42}>
    <Route path="/error" component={Error}/>

    <Route href="/" path="*" component={Home}>
      <img class="logo" src="images/logo.svg" alt="System Dashboard" />
      System Dashboard
    </Route>
    <ul class="left">
      <li>
        <SystemdMachineRoutes guards={enshureSession} {session}>
          Machines
        </SystemdMachineRoutes>
        <SystemdUnitRoutes guards={enshureSession} {session}>
          Units
        </SystemdUnitRoutes>
        <SystemdTimerRoutes guards={enshureSession} {session}>
          Timer
        </SystemdTimerRoutes>
        <SystemdSocketRoutes guards={enshureSession} {session}>
          Sockets
        </SystemdSocketRoutes>
        <Fail2BanRoutes guards={enshureSession} {session}>
          Fail 2 Ban
        </Fail2BanRoutes>
        <NetworkRoutes guards={enshureSession} {session}>
          Network
        </NetworkRoutes>
        <Route path="/journal" guards={enshureSession} component={Journal}>
          Journal
        </Route>
        <Route path="/services" guards={enshureSession} component={Services}>
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
                on:click|preventDefault={() => session.invalidate()}>
                Signed in as {$session.username}
              </a>
              <div class="dropdown-divider" />
              <a
                href="#!"
                class="dropdown-item"
                on:click|preventDefault={() => session.invalidate()}>
                Sign out
              </a>
            </div>
          </Menue>
        {:else}
          <Route path="/login" component={Login}>Login</Route>
        {/if}
      </li>
    </ul>
  </TopNav>
  <main>
    <Outlet />
  </main>
</Router>
