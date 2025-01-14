<script>
  import MenuDropdown from "@/components/headerNav/profil/MenuDropdown.vue" ;
  export default {
    name: 'ConnectedComponent',
    components: {
      MenuDropdown,
    },
    data() {
      return {
        isMenuVisible: false
      }
    },
    methods: {
      toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible
      },
      showMenu() {
        this.isMenuVisible = true;
      },
      hideMenu() {
        this.isMenuVisible = false;
      }
    }
  }
</script>

<template>
  <div class="profile" >
    <div class="profile-wrapper"  @mouseleave="hideMenu">
      <router-link class="account" to="/Profile" @click="toggleMenu" @mouseenter="showMenu">Profile</router-link>
      <MenuDropdown :isMenuVisible="isMenuVisible" class="menu"/>
    </div>
  </div>
</template>

<style scoped>
  .profile {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-self: center;
    width: 100%;
  }
  .account {
    display: inline-block;
    background: rgba(184, 134, 11, 0.7);
    color: #e3e3e3;
    text-align: center;
    align-self: center;
    padding: 12px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }

  .account:hover {
    color: white;
    background-color: rgba(184, 134, 11, 1);
  }

  .profile-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .menu {
    position: fixed;
    top: 70px;
  }
</style>