<script>
  export default {
    name: 'ConnectedComponent',
  }
</script>

<template>
  <div class="profile">
    <router-link class="signUp"  to="/Profile">Profile</router-link>
  </div>
</template>

<style scoped>
  .profile {
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