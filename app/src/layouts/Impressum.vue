<template>
  <v-container>
    <br />
    <br />
    <h1>Impressum</h1>
    <br />
    <h2>Angaben gemäß § 5 TMG</h2>
    <br />
    <img class="imprint" src="../../public/img/imprint_1.png" />
    <br />
    <br />
    <h2>Kontakt</h2>
    <br />
    <img class="imprint" src="../../public/img/imprint_2.png" />
    <br />
    <br />
    <h3>Alle Angaben ohne Gewähr</h3>
    <p>Wir übernehmen keinerlei Gewähr für die Vollständigkeit, Richtigkeit und Aktualität der bereitgestellten Informationen.</p>
    <br />
    <h3>Haftung für Inhalte</h3>
    <p>
      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
      allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
      verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
      forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
      Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
      Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
      Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
    </p>
    <br />
    <h3>Haftung für Links</h3>
    <p>
      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
      Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
      verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
      Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
      waren zum Zeitpunkt der Verlinkung nicht erkennbar.
      Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
      Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
      umgehend entfernen.
    </p>
    <br />

    <h3>Urheberrecht</h3>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
      Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
      Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
      beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
      Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
      Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
    </p>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Impressum"
});
</script>
<style scoped>
h1 {
  font-family: canada-type-gibson, sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-left: 0.5rem;
}

h2 {
  font-family: canada-type-gibson, sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-left: 0.5rem;
}

h3 {
  font-family: canada-type-gibson, sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-left: 0.5rem;
}

p {
  font-family: canada-type-gibson, sans-serif;
  font-style: normal;
  margin-left: 0.5rem;
}

.imprint {
  width: 320px;
  padding: 0.3rem;
}
</style>
