<script>
  export default {
    name: 'RegistrationComponent',
  }
</script>

<template>
  <div class="registration">
    <router-link class="SignIn"  to="/Login">Sign In</router-link>
    <router-link class="signUp"  to="/Registration">Sign Up</router-link>
  </div>
</template>

<style scoped>
  .SignIn {
    padding: 14px 20px;
    align-self: center;
    text-decoration: none;
    font-weight: bold;
    color: white;
  }

  .registration {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .signUp {
    background: rgba(184, 134, 11, 0.7);
    color: white;
    text-align: center;
    align-self: center;
    padding: 12px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }
</style>