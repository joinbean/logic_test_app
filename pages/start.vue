<template>
  <section class="text-section start">
    <div class="content">
      <h1>LOGIQUE</h1>
      <h4>Test Anleitung</h4>
      <p>Auf jeder Seite befindet sich auf der linken Hälfte der Seite ein Muster mit</p>
      <p>einer Lücke. Es ist deine Aufgabe herauszufinden, welches der rechts</p>
      <p>abgebildeten Teilstücke in die Lücke eingesetzt werden muss, damit das</p>
      <p>Muster perfekt geflickt ist. Es passt jeweils nur ein Teilstück in die Lücke.</p>

      <p>Du hast für diese Aufgabe 35 Minuten zur Verfügung.</p>
    </div>
    <div class="button-section">
      <button @click="$router.push('/quiz')">
        Start
      </button>
    </div>
  </section>
</template>

<script>
export default {
}
</script>
