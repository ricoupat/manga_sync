<script>
  import ConnectedComponent from "@/components/ConnectedComponent.vue";
  import RegistrationComponent from "@/components/RegistrationComponent.vue";

  export default {
    name: "HeaderComponent",
    components: {
      ConnectedComponent,
      RegistrationComponent
    },
    computed: {
      layoutComponent() {
        return this.$store.state.isAuthenticated ? 'ConnectedComponent' : 'RegistrationComponent';
      }
    }
  }
</script>

<template>
  <header class="header-container">
    <nav class="navbar">
      <div class="container">
        <div class="logo-container">
          <router-link class="link-logo" to="/">
            <img class="logo" src="../../assets/logo.png" alt="Home">
          </router-link>
        </div>
        <div class="pages">
          <router-link class="link"  to="/Search">Search</router-link>
          <router-link class="link"  to="/About">About</router-link>
        </div>
        <component :is="layoutComponent" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
}
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 60px;
}

.logo-container {
  display: flex;
  justify-content: left;
  width: 100%;
}

.pages {
  display: flex;
  justify-content: center;
  width: 100%;
}

.link {
  padding: 14px 20px;
  align-self: center;
  text-decoration: none;
  font-weight: bold;
  color: white;
}

.link-logo {
  width: 100%;
}

.logo {
  max-height: 100%;
}

</style>