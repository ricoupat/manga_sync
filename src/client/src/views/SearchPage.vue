<script>
import BrowserComponent from "@/components/BrowserComponent.vue";
import MangaDisplayBasicComponent from "@/components/MangaDisplayBasicComponent.vue";
import MangaDisplaySearchComponent from "@/components/MangaDisplaySearchComponent.vue";

  export default {
    name: 'SearchPage',
    components: {
      MangaDisplayBasicComponent,
      MangaDisplaySearchComponent,
      BrowserComponent,
    },
    data() {
      return {
        browsing: false,
        filters: {
          research: '',
          genre: [],
          status: [],
        }
      };
    },
    methods: {
      showResults(filters) {
        const { research, genre, status } = filters;
        let resetFilters = true

        if (research.length !== 0 || genre !== "" || status !== "") {
          this.filters.research = research;

          if (!this.filters.genre.includes(genre)) {
            this.filters.genre.push(genre);
            resetFilters = false
          }

          if (!this.filters.status.includes(status)) {
            this.filters.status.push(status)
            resetFilters = false
          }

          resetFilters && research.length === 0 ? this.browsing = false : this.browsing = true
        }
        else {
          this.browsing = false;
        }

      }
    },
    computed: {
      layoutComponent() {
        return this.browsing ? 'MangaDisplaySearchComponent' : 'MangaDisplayBasicComponent';
      }
    }
  }
</script>

<template>
  <div class="search-page">
    <div class="search-page-header">
      <BrowserComponent @browse="showResults"/>
    </div>
    <div class="search-page-filter">
    </div>
    <div class="search-page-content">
      <component :is="layoutComponent"/>
    </div>
  </div>
</template>

<style scoped>
  .search-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .search-page-header {
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
  }
</style>