<script>
import  axios from "axios";
import { eventBus } from "@/eventBus";

export default {
  name: "RegistrationPage",
  data() {
    return {
      surname: '',
      email: '',
      password: '',
      confirmation: ''
    }
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(this.email);
    },
    isFormValid() {
      return this.surname && this.isEmailValid && this.password && this.password === this.confirmation;
    }
  },
  methods: {
    async addMember() {
      try {
        const newMember = {
          surname: this.surname,
          email: this.email,
          password: this.password
        };
        await axios.post("/api/members", newMember);
        this.surname = "";
        this.email = "";
        this.password = "";
        this.confirmation = "";

        eventBus.$emit("memberAdded");
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<template>
  <div class="addMember">
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="addMember">
      <input class="input" v-model="surname" type="text" placeholder="Surname" name="surname" />
      <input class="input" v-model="email" type="text" placeholder="Email" name="email" />
      <input class="input" v-model="password" type="password" placeholder="Password" name="password" />
      <input class="input" v-model="confirmation" type="password" placeholder="Confirmation" name="Confirmation" />
      <button class="submit-button" :class="{'valid': isFormValid, 'invalid': !isFormValid}" type="submit" :disabled="!isFormValid">Register</button>
    </form>
  </div>
</template>

<style scoped>
.addMember {
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