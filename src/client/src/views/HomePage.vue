<template>
  <div class="home">
    <h1>Welcome to MangaSync</h1>
    <DisplayListComponent
        listName="Trending Mangas"
        :items="trendingMangas"
        maxVisible=10
        moreItemsRoute="SearchPage"
    />
    <DisplayListComponent
        listName="Newest Mangas"
        :items="newestMangas"
        maxVisible=10
        moreItemsRoute="SearchPage"
      />
  </div>
</template>

<script>
import DisplayListComponent from "@/components/DisplayListComponent.vue";
import axios from "axios";
import {mapActions} from "vuex";
export default {
  name: 'HomePage',
  components: {
    DisplayListComponent,
  },
  data() {
    return {
      trendingMangas: [],
      newestMangas: [],
    }
  },
  async created() {
    await this.fetchDataTrending();
    await this.fetchDataNewest();
  },
  methods: {
    ...mapActions(['triggerAlert']),
    async fetchDataTrending() {
      try {
        const response = await axios.post("/api/manga/trending")
        this.trendingMangas = response.data;
      } catch (error) {
        await this.triggerAlert({ message: "Error fetching data", type: "error" });
      }
    },
    async fetchDataNewest() {
      try {
        const response = await axios.post("/api/manga/newest");
        this.newestMangas = response.data;
      } catch (error) {
        await this.triggerAlert({ message: "Error fetching data", type: "error" });
      }
    }
  }
};
</script>

<style scoped>
</style>