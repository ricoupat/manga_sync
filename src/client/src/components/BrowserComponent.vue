<script>
  export default {
    name: "BrowserComponent",
    data() {
      return {
        research: '',
        genre: '',
        status: '',
      }
    },
    methods: {
      browse() {
        const filters = {
          research: this.research,
          genre: this.genre,
          status: this.status
        };
        this.$emit('browse', filters);
      }
    }
  }
</script>

<template>
  <Form @submit.prevent="browse">
    <input v-model="research" class="search-input" type="text" placeholder="Search..." @keyup="browse"/>
    <select v-model="genre" class="search-select" @change="browse">
      <option value="shonen">shonen</option>
      <option value="other">other</option>
    </select>
    <select v-model="status" class="search-select" @change="browse">
      <option value="OnGoing">OnGoing</option>
      <option value="Finished">Finished</option>
    </select>
  </Form>
</template>

<style scoped>

</style>