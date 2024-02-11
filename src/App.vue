<template>
  <Scichart2d />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scichart2d from "./components/Scichart2d.vue";

export default defineComponent({
  name: "App",
  components: {
    Scichart2d,
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
