<script>
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  name: "LoginPage",
  data() {
    return {
      login: '',
      password: ''
    }
  },
  computed: {
    isFormValid() {
      return this.login && this.password;
    }
  },
  methods: {
    ...mapActions(['triggerAlert']),
    async tryConnection() {
      try {
        const response = await axios.post(`/api/members/login`, {
          login: this.login,
          password: this.password,
        });
        if (response.status === 200 && response.data.isPasswordValid) {
          await this.triggerAlert({ message: "Connected", type: "success" });
          this.$store.dispatch('setAuthenticated', true);
          this.$router.push({ path: "/" });
        }
      } catch (error) {
        if (error.status === 401) {
          await this.triggerAlert({message: 'Login failed. Please check your login and password', type: 'error'});
        }
        else {
          await this.triggerAlert({message: 'An error occurred while logging in', type: 'error'});
        }
      }
    }
  },
};
</script>

<template>
  <div class="signed-in">
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="tryConnection">
      <input class="input" v-model="login" type="text" placeholder="Login" name="login" />
      <input class="input" v-model="password" type="password" placeholder="Password" name="password" />
      <button class="submit-button" :class="{'valid': isFormValid, 'invalid': !isFormValid}" type="submit" :disabled="!isFormValid">Register</button>
    </form>
  </div>

</template>

<style scoped>
.signed-in {
  margin: 3rem auto auto;
  max-width: 500px;
  background-color: rgba(220, 220, 220, 0.67);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #555c;
  font-size: 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus {
  border-color: darkorange;
  box-shadow: 0 0 0 5px rgba(255, 140, 0, 0.22);
  outline: #ffffff solid 2px;
}

.submit-button {
  margin-top: 10px;
  background-color: rgba(128, 128, 128, 0.3);
  width: 25%;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border: none;
  font-weight: bold;
  font-size: 100%;
}

.submit-button:focus, .submit-button.valid:hover {
  border-color: forestgreen;
  box-shadow: 0 0 0 5px rgba(34, 139, 34, 0.22);
  outline: #ffffff solid 2px;
}

.submit-button.valid {
  background-color: forestgreen; /* Vert */
  color: white;
  border: 1px solid #555c;
  font-size: 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>