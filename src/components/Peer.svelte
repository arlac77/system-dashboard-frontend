<script>
  export let peer;
</script>

<div>
  {peer.host}:{peer.port}
  {#if peer.referrer}(referrer {peer.referrer.host}:{peer.referrer.port}){/if}
  {#if peer.to}(to {peer.to.host}:{peer.to.port}){/if}
</div>
