<script>
  export default {
    name: 'SearchDataDisplayComponent',
    props: {
      results: {
        type: Array,
        required: true,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      hasMore: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      displayedItems () {
        return this.results;
      }
    },
  }
</script>

<template>
  <div class="search-results">
      <ul class="results-list">
        <li v-for="result in displayedItems" :key="result.id" class="result-item">
          <div class="item">
            <img :src="result.coverImage" :alt="result.title" />
            <span>{{ result.title }}</span>
          </div>
        </li>
      </ul>
    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
    </div>
    <div v-if="!hasMore && !isLoading" class="end-message">
      <p>No more results to display</p>
    </div>
  </div>
</template>

<style scoped>
.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.results-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.item img {
  width: 180px;
  height: 240px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  transition: all .1s ease-in-out;
}

.item:hover img {
  scale: 1.05;
  box-shadow: 0 0 15px rgba(0, 0, 0, 1);
}

.item span {
  font-weight: bold;
  color: #6c6c6c;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
}

.item:hover span {
  color: #3498db;
}

.loading {
  margin: 20px;
  color: #555;
  font-weight: bold;
}

.end-message {
  margin: 20px 0;
  text-align: center;
  color: gray;
}
</style>