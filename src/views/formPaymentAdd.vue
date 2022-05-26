<template>
  <div class="payment-add">
    <div>
      <h1 class="title" v-show="category">Add new payment in {{ category }}</h1>
      <formPaymentAdd :categoryProp="category" :valueProp="value" />
    </div>
  </div>
</template>

<script>
import formPaymentAdd from "@/components/formPaymentAdd.vue";
export default {
  name: "HomeView",
  components: {
    formPaymentAdd,
  },
  data() {
    return {
      category: null,
      value: null,
    };
  },
  methods: {
    getLinkParams() {
      let params = new URLSearchParams(location.search);
      this.category = this.$route.params.category;
      if (params.get("value")) {
        this.value = +params.get("value");
      }
    },
  },
  created() {
    this.getLinkParams();
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 44px;
}
.payment-add {
  display: flex;
}
</style>