<script>
  import { Login } from "svelte-session-manager";
  import { Modal } from "svelte-common";
  import { session } from "../session.mjs";
  import { api } from "../constants.mjs";

  export let router;
</script>

<Modal close={() => router.abort('/')}>
  <Login
    {session}
    endpoint={api + '/authenticate'}
    result={() => router.continue('/')} />
</Modal>
