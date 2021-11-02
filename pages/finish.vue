<template>
  <section class="text-section finish">
    <div class="content">
      <h1>Danke!</h1>
      <p>Wir bedanken uns sehr für den Abschluss des</p>
      <p>Testes. Sie können nun den Test einreichen.</p>
    </div>
    <div class="button-section">
      <button @click="$router.push('/register')">
        Abschliessen
      </button>
    </div>
  </section>
</template>

<script>
export default {
}
</script>
