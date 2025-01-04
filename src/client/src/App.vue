<template>
  <AlertComponent v-if="alert.visible" :type="alert.type" :message="alert.message" :dismissible="true"/>
  <DefaultLayout/>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import { mapState } from "vuex";

export default {
  name: 'App',
  components: {
    DefaultLayout,
    AlertComponent,
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    }),
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
}

html, body {
  height: 100%;
  margin: 0;
}
</style>
