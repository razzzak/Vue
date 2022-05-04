<template>
  <div class="home">
    <calc-app msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import CalcApp from "@/components/CA.vue";
export default {
  name: "HomeView",
  components: {
    CalcApp,
  },
};
</script>
