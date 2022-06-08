<template>
  <form @submit.prevent="submitFunc">
    <fieldset>
      <div>
        <input
          v-if="!idProp"
          type="date"
          placeholder="Payment data"
          v-model="date"
        />
        <input
          type="number"
          placeholder="Payment value"
          v-model.number="value"
        />
      </div>
      <select v-model="category">
        <option disabled selected value="">Choose your category</option>
        <option v-for="(option, i) in categoryList" :key="i" :value="option">
          {{ option }}
        </option>
      </select>
    </fieldset>
    <br />
    <button v-if="idProp" class="btn">Save</button>
    <button v-else class="btn">Add cost <span>+</span></button>
  </form>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "formPaymentAdd",
  props: {
    payment: {
      type: Object,
    },
  },
  data() {
    return {
      category: "",
      value: null,
      date: null,
      submitFunc: this.addPaymentData,
      idProp: null,
    };
  },
  computed: {
    ...mapGetters(["getCategoryList", "getDataLoaded", "getCategoriesLoaded"]),
    categoryList() {
      return this.getCategoryList;
    },
    categoriesLoaded() {
      return this.getCategoriesLoaded;
    },
    paymentsLoaded() {
      return this.getDataLoaded;
    },
    getCurrentDate() {
      const today = new Date();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const currentDate = new Intl.DateTimeFormat("ru-RU", options).format(
        today
      );
      return currentDate;
    },
  },
  methods: {
    ...mapMutations(["addDataToPaymentsList", "setPaymentData"]),
    convertDate(date) {
      if (date) {
        let dateArr = date.split("-");
        if (+dateArr[1] < 10) {
          return `${dateArr[2]}.0${+dateArr[1]}.${dateArr[0]}`;
        }
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
      }
      return this.getCurrentDate;
    },
    addPaymentData() {
      const data = {
        date: this.convertDate(this.date),
        category: this.category,
        value: this.value,
      };
      this.addDataToPaymentsList(data);
    },
    editPayment() {
      const paymentData = {
        id: +this.idProp,
        category: this.category,
        value: this.value,
      };
      this.setPaymentData(paymentData);
    },
  },
  async created() {
    if (!this.paymentsLoaded) {
      await this.$store.dispatch("fetchData");
    }
    if (!this.categoriesLoaded) {
      await this.$store.dispatch("fetchCategoryList");
    }
    if (this.payment) {
      this.category = this.payment.category;
      this.value = this.payment.value;
      if (this.payment?.id) {
        this.submitFunc = this.editPayment;
        this.idProp = this.payment.id;
        return;
      }
      this.addPaymentData();
    }
  },
  mounted() {
    console.log(this.payment);
  },
};
</script>
<style scoped lang="scss">
form {
  max-width: 384px;
  text-align: right;
  div {
    display: flex;
    margin-bottom: 10px;
  }
  fieldset {
    border-color: #ffffff;
    padding: 0;
    border: 0;
    margin: 0;
    legend {
      font-size: 12px;
    }
  }
}
input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  & + input {
    margin-left: 10px;
  }
}
select {
  display: block;
  width: 100%;
  padding: 0.594rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>