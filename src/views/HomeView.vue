<template>
  <div class="home">
    <div>
      <header>
        <h1 class="title">My personal costs</h1>
      </header>
      <formVisiabilityButton
        :classBtn="'show'"
        :show="show"
        @changeVisiability="changeVisiability('show')"
      >
        Add new cost
      </formVisiabilityButton>
      <div v-show="show">
        <formPaymentAdd />
      </div>
      <paymentsList
        :payments="currentPageElements"
        :currentPage="current"
        :elementsOnPage="elementsOnPage"
      />
      <paginationModule
        :current="current"
        :length="getPaymentsList.length"
        :elementsOnPage="elementsOnPage"
        @changePage="changePage"
      />
      <br />
      <div>
        <formCategoryAdd />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import paymentsList from "@/components/paymentsList.vue";
import formVisiabilityButton from "@/components/formVisiabilityButton.vue";
import formPaymentAdd from "@/components/formPaymentAdd.vue";
import paginationModule from "@/components/paginationModule.vue";
import formCategoryAdd from "@/components/formCategoryAdd.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    paymentsList,
    formVisiabilityButton,
    formPaymentAdd,
    paginationModule,
    formCategoryAdd,
  },
  data() {
    return {
      show: false,
      current: 1,
      elementsOnPage: 3,
    };
  },
  computed: {
    ...mapGetters(["getPaymentsList", "getDataLoaded"]),
    currentPageElements() {
      return this.getPaymentsList.slice(
        this.elementsOnPage * (this.current - 1),
        this.elementsOnPage * (this.current - 1) + this.elementsOnPage
      );
    },
  },
  methods: {
    ...mapMutations(["setPaymentsListData"]),
    changePage(page) {
      this.current = page;
    },
    changeVisiability(el) {
      this[el] = !this[el];
    },
  },
  async created() {
    if (!this.getDataLoaded) {
      await this.$store.dispatch("fetchData");
    }
  },
};
</script>

<style lang="scss">
.title {
  font-size: 44px;
}
.home {
  display: flex;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  margin-bottom: 20px;
  span {
    margin-left: 10px;
    font-size: 16px;
  }
}
</style>