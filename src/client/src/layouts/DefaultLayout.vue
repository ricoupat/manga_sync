<script>
import HeaderComponent from "@/components/global/HeaderComponent.vue";
import Footer from "@/components/global/FooterComponent.vue"

export default {
  name: 'DefaultLayout',
  components: {
    Header: HeaderComponent,
    Footer
  },
  data() {
    return {
      isFooterVisible: false,
      isHeaderTransparent: false
    }
  },
  methods: {
    handleScrollFooter() {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      this.isFooterVisible = scrollPosition + windowHeight >= documentHeight - 100;
    },
    handleScrollHeader() {
      this.isHeaderTransparent = window.scrollY > 50;
    }
  },
  mounted() {
    this.handleScrollFooter();
    this.handleScrollHeader();
    window.addEventListener("scroll", this.handleScrollFooter);
    window.addEventListener("scroll", this.handleScrollHeader);
  },
  watch: {
    $route() {
      this.$nextTick(() => this.handleScrollFooter());
    },
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScrollFooter);
    window.removeEventListener("scroll", this.handleScrollHeader);
  }
}
</script>

<template>
  <Header :class="{transparent: isHeaderTransparent}"/>
  <main>
    <router-view></router-view>
  </main>
  <Footer :class="{show: isFooterVisible}"/>
</template>

<style scoped>
  Footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(51, 51, 51, 1);
    box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.5);
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 1000;
  }

  Footer.show {
    opacity: 1;
  }

  Header {
    position: fixed;
    width: 100%;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    background-color: rgba(51, 51, 51, 1);
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.5);
  }

  Header.transparent {
    background-color: rgba(51, 51, 51, 0.7);
    box-shadow: none;
  }

  main {
    margin-top: 60px;
    flex-grow: 1;
    box-sizing: border-box;
    padding-bottom: 117px;
  }
</style>