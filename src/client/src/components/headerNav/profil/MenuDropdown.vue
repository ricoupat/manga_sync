<script>
import {mapActions} from "vuex";
import axios from "axios";

export default {
    name: "MenuDropdown",
    props: {
      isMenuVisible: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      ...mapActions(['triggerAlert']),
      async disconnect() {
        try {
          const response = await axios.post('/api/auth/logout');
          this.$store.dispatch('setAuthenticated', response.data.isLoggedIn);
          await this.triggerAlert({ message: "Disconnected", type: "warning" });
          this.$router.push({ path: "/" });
        } catch (error) {
          this.triggerAlert({message: 'Logout failed. Try again later', type: 'error'});
        }
      }
    }
  }

</script>

<template>
  <ul v-if="isMenuVisible" class="menu-dropdown">
    <li>Profile</li>
    <li>Settings</li>
    <li @click="disconnect">Disconnect</li>
  </ul>
</template>

<style scoped>
  .menu-dropdown {
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    width: 200px;
    animation: fadeIn 0.3s ease;
    list-style: none;
    padding: 15px 0;
    margin: 0;
  }

  .menu-dropdown li {
    font-weight: bold;
    padding: 10px 15px;
    font-size: 14px;
    color: #6c6c6c;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .menu-dropdown li:hover {
    color: #333;
    background-color: #f1f1f1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>