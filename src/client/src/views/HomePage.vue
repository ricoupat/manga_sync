<template>
  <div class="home">
    <h1>Page d'Accueil</h1>
    <p>Bienvenue sur la page d'accueil de notre site.</p>
    <MembersList/>
  </div>
</template>

<script>
import MembersList from "@/components/MembersList.vue";
export default {
  name: 'HomePage',
  components: {
    MembersList
  }
};
</script>

<style scoped>
/* Votre style ici */
</style>