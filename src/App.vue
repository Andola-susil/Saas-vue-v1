<template>
  <div id="app">
    <Header />
    <div :class="['main', { 'no-sidebar': hideSidebar }]">
      <Sidebar v-if="!hideSidebar" />
      <div :class="{ 'content': !hideSidebar, 'full-content': hideSidebar }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/HeaderTemplate.vue'
import Sidebar from './components/SideBar.vue'
import "./assets/css/style.css";

export default {
  name: 'App',
  components: {
    Header,
    Sidebar
  },
  setup() {
    const route = useRoute()
    const hideSidebar = computed(() => route.meta.hideSidebar)
    
    return {
      hideSidebar
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  display: flex;
  flex: 1;
  /* margin-top: 60px; Adjust according to header height */
}

.no-sidebar .content {
  margin-left: 0;
}

.content {
  flex: 1;
  margin-left: 200px; /* Adjust according to sidebar width */
  padding: 1rem;
}

.full-content {
  /* padding: 1rem; */
  width: 100%;
}
</style>
