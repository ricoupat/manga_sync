<script>
import BrowserComponent from "@/components/BrowserComponent.vue";
import SearchDataDisplayComponent from "@/components/SearchDataDisplayComponent.vue";
import axios from "axios"

export default {
    name: 'SearchPage',
    components: {
      BrowserComponent,
      SearchDataDisplayComponent,
    },
    data() {
      return {
        browsing: false,
        filters: {
          research: [],
          genre: [],
          status: [],
        },
        searchQuery: "",
        results: [],
        page: 1,
        isLoading: false,
        hasMore: true,
      };
    },
    methods: {
      showResults(filters) {
        const {research, genre, status} = filters;
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
        } else {
          this.browsing = false;
        }

      },
      async fetchDefaultManga() {
        this.isLoading = true;
        try {
          const response = await axios.get("/api/manga/search/", {
            params: {page: this.page}
          });
          if (this.page === 1) {
            this.results = response.data;
          }
          else {
            this.results = [...this.results, ...response.data];
          }
          this.hasMore = response.data.length > 0;
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      },
      async searchManga() {
        try {
          const response = await axios.get("/api/manga", {
            params: {searchQuery: this.searchQuery, page: this.page},
          });

          if (this.page === 1) {
            this.results = response.data;
          } else {
            this.results = [...this.results, ...response.data];
          }

          this.hasMore = response.data.length > 0;
        } catch (error) {
          console.error("Error searching mangas:", error);
        } finally {
          this.isLoading = false;
        }
      },
      handleScroll() {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 5 && this.hasMore && !this.isLoading) {
          this.page++;
          if (this.searchQuery) {
            this.searchManga();
          } else {
            this.fetchDefaultManga();
          }
        }
      }
    },
    async mounted() {
      this.results = this.$store.state.defaultSearchManga.items;
      if (this.results.length === 0) {
        await this.fetchDefaultManga();
      }
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
      this.$store.dispatch("fetchDefaultSearchManga", {items: []})
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>

<template>
  <div class="search-page">
    <div class="search-page-header">
      <BrowserComponent @browse="showResults"/>
      <div class="search-page-filter">
        <div class="filter-container" v-for="filter in filters" :key="filter.id">
          <span v-for="item in filter" :key="item.id" :class="`filter-${item}`">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="search-page-content">
      <SearchDataDisplayComponent
          :results="results"
          :isLoading="isLoading"
          :hasMore="hasMore"
      />
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
    flex-direction: column;
    width: 80%;
    justify-content: space-between;
    padding: 50px 0;
  }
  .search-page-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .filter-container {
    display: flex;
    flex-direction: row;
    padding-right: 10px;
  }
  .search-page-content {
    width: 80%;
  }
</style>