<script>
export default {
    name: 'DisplayListComponent',
    props: {
      listName: {
        type: String,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      maxVisible: {
        type: Number,
        default: 8,
      },
      moreItemsRoute: {
        type: String,
        required: false,
      }
    },
    computed: {
      displayedItems () {
        return this.items.slice(0, this.maxVisible);
      }
    },
  methods: {
      async handleClick () {
        await this.$store.dispatch("fetchDefaultSearchManga", {items: this.items});
      }
  }
}
</script>

<template>
  <div class="listComponent">
    <span class="listName">{{ listName }}</span>
    <div class="scrollableContainer">
      <ul class="list">
        <li v-for="item in displayedItems" :key="item.id">
          <div class="item">
            <img :src="item.coverImage" :alt="item.name">
            <span class="name">{{ item.title }}</span>
          </div>
        </li>
      </ul>
      <router-link
          v-if="items.length > maxVisible && moreItemsRoute"
          :to="{ name: 'SearchPage'}"
          @click="handleClick"
          class="more">
        View More
      </router-link>

    </div>
  </div>

</template>

<style scoped>
  .listComponent {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .listName {
    width: 80%;
    margin: 0;
    font-weight: bold;
    text-align: start;
  }
  .scrollableContainer {
    display: flex;
    flex-direction: row;
    width: 80%;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0 0 10px 0;
    margin: 0 auto;
    align-items: center;
  }
  .list {
    display: inline-flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    margin: 0 30px 0 5px;
    text-align: center;
    color: #6c6c6c;
    font-weight: bold;
    cursor: pointer;
  }
  .item:hover {
    color: #3498db;
  }
  .item img {
    width: 150px;
    height: 200px;
    border-radius: 5px;
    margin: 5px 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    transition: all .1s ease-in-out;
  }

  .item:hover img {
    scale: 1.05;
  }

  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
    -webkit-line-clamp: 2;
    font-size: 14px;
    line-height: 1.4;
    max-width: 150px;
  }

  .more {
    color: #6c6c6c;
    font-weight: bold;
    text-decoration: none;
  }

  .more:hover {
    color: #3498db;
  }
</style>