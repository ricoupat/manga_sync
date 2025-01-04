<script>

</script>

<template>
  <footer>
    <div class="container">
      <div class="column1">
        <router-link class="link"  to="/About">About</router-link>
        <router-link class="link"  to="/Registration">Registration</router-link>
        <router-link class="link"  to="/Registration">Registration</router-link>
      </div>
      <div class="column2">
        <router-link class="link"  to="/Registration">Registration</router-link>
        <router-link class="link"  to="/Registration">Registration</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: white;
  }

  .column1, .column2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }


  .link {
    color: white;
    text-decoration: none;
    margin: 5px 0 5px 0;
  }
  .link:first-child {
    margin-top: 20px;
  }
  .link:last-child {
    margin-bottom: 20px;
  }
</style>