<template>
  <form @submit.prevent="addPaymentData">
    <fieldset>
      <legend>Add new cost</legend>
      <div>
        <input type="date" placeholder="Payment data" v-model="date" />
        <input
          type="number"
          placeholder="Payment value"
          v-model.number="value"
        />
      </div>
      <select v-model="category">
        <option disabled selected value="">Выберите категорию</option>
        <option v-for="(option, i) in categoryList" :key="i" :value="option">
          {{ option }}
        </option>
      </select>
    </fieldset>
    <br />
    <button class="btn">Add cost <span>+</span></button>
  </form>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "formPaymentAdd",
  props: {
    categoryProp: {
      type: String,
      default: () => "",
    },
    valueProp: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      category: "",
      value: null,
      date: null,
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
    ...mapMutations(["addDataToPaymentsList"]),
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
  },
  async created() {
    if (!this.paymentsLoaded) {
      await this.$store.dispatch("fetchData");
    }
    if (!this.categoriesLoaded) {
      await this.$store.dispatch("fetchCategoryList");
    }
    if (this.categoryProp) {
      this.category = this.categoryProp;
    }
    if (this.valueProp) {
      this.value = this.valueProp;
    }
    if (this.categoryProp && this.valueProp) {
      this.addPaymentData();
    }
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
    border-style: solid;
    border-width: 1px;
    box-shadow: 0px 0px 15px rgba(222, 222, 222, 0.5);
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