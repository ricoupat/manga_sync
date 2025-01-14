<script>
import  axios from "axios";
import { eventBus } from "@/eventBus";
import {mapActions} from "vuex";

export default {
  name: "RegistrationPage",
  data() {
    return {
      surname: '',
      email: '',
      password: '',
      confirmation: '',
      fieldErrors: {
        surname: '',
        email: '',
        password: '',
        confirmation: '',
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.fieldErrors.surname &&
          this.surname &&
          !this.fieldErrors.email &&
          this.email &&
          !this.fieldErrors.password &&
          this.password === this.confirmation &&
          this.confirmation
    }
  },
  methods: {
    ...mapActions(['triggerAlert']),
    async addMember() {
      try {
        const newMember = {
          surname: this.surname,
          email: this.email,
          password: this.password,
          confirmation: this.confirmation
        };
        await axios.post("/api/members", newMember);
        this.surname = "";
        this.email = "";
        this.password = "";
        this.confirmation = "";

        eventBus.$emit("memberAdded");
        this.$store.dispatch('setAuthenticated', true);
        await this.triggerAlert({message: "Welcome to Your Account!", type: "success"});
        this.$router.replace({ path: "/" });
      } catch (error) {
        if (error.response?.data?.details) {
          for (const [field, message] of Object.entries(error.response.data.details)) {
            this.fieldErrors[field] = message;
          }
        } else {
          await this.triggerAlert({message: 'Unexpected Error', type: 'error'});
        }
      }
    },
    clearErrors(name) {
      this.fieldErrors[name] = '';
    },
    async validateField(field) {
      try {
        this.fieldErrors[field] = await this.validate(field, this[field]);
      } catch (error) {
        console.error("Validation error:", error);
      }
    },
    async validate(field, value) {
      switch (field) {
        case "surname": {
          if (value.length < 3) return "At least 3 characters long";
          try {
            const response = await axios.post(`/api/members/usernameValidate`, {
              login: value,
            });
            if (response.status === 200 && response.data !== '') {
              return "Surname already used";
            }
          } catch (error) {
            return "Unable to validate surname, please try again later";
          }
          break;
        }
        case "email": {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(value)) return "Email format is invalid"
          break;
        }
        case "password": {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (this.password.length < 8) return "Password must be between 8 and 20 characters long";
          if (!passwordRegex.test(value)) return "Password must include at least an [A-Z], [a-z], [0-9] and a special character";
          break;
        }
        case "confirmation": {
          if (value !== this.password) return "Passwords do not match";
          break;
        }
      }
      return "";
    }
  },
};
</script>

<template>
  <div class="addMember">
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="addMember">
      <input class="input" v-model="surname" type="text" placeholder="Surname" name="surname" @focusin="clearErrors('surname')" @input="validateField('surname')"/>
      <p v-if="fieldErrors.surname" class="error-message">{{ fieldErrors.surname }}</p>

      <input class="input" v-model="email" type="text" placeholder="Email" name="email" @focus="clearErrors('email')" @input="validateField('email')"/>
      <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>

      <input class="input" v-model="password" type="password" placeholder="Password" name="password" @focus="clearErrors('password')" @input="validateField('password')"/>
      <p v-if="fieldErrors.password" class="error-message">{{ fieldErrors.password }}</p>

      <input class="input" v-model="confirmation" type="password" placeholder="Confirmation" name="confirmation" @focus="clearErrors('confirmation')" @input="validateField('confirmation')"/>
      <p v-if="fieldErrors.confirmation" class="error-message">{{ fieldErrors.confirmation }}</p>

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
  margin-top: 10px;
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
  background-color: forestgreen;
  color: white;
  border: 1px solid #555c;
  font-size: 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.error-message {
  color: red;
  font-size: 15px;
  margin: 2px 0 0 0;
}
</style>